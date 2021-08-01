import { ThemeT, ThemeType } from 'presentation/context/Theme/types';

const light: ThemeT = {
    type: ThemeType.Light,
    colors: {
        base: '#FFFFFF',
        text: '#000000',
    },
    font: {
        family: {
            base: 'Arial',
        },
        weight: {
            regular: 'normal',
        },
    },
};

export default light;
