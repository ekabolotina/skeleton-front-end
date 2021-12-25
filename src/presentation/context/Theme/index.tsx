import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createContext, FC, useContext, useState } from 'react';
import themes from './themes';
import { ContextT, ThemeType } from './types';

const [defaultTheme] = themes;
const Context = createContext<ContextT>({} as ContextT);

export const ThemeProvider: FC = (props) => {
    const { children } = props;
    const [themeType, setThemeType] = useState<ThemeType>(ThemeType.Light);
    const theme = themes.find(({ type }) => type === themeType) || defaultTheme;

    return (
        <Context.Provider
            value={{
                themeType,
                setThemeType,
            }}
        >
            <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
        </Context.Provider>
    );
};

export function useTheme(): ContextT {
    return useContext(Context);
}

export { themes };

export * from './types';
