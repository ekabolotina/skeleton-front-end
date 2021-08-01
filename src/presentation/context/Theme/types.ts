export enum ThemeType {
    Light,
}

export type ThemeT = {
    type: ThemeType;
    colors: {
        base: string;
        text: string;
    };
    font: {
        weight: {
            regular: string;
        };
        family: {
            base: string;
        };
    };
};

export type ContextT = {
    themeType: ThemeType;
    setThemeType: (themeType: ThemeType) => void;
};
