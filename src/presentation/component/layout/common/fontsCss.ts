import { css, SerializedStyles } from '@emotion/react';
import fontFace from 'polished/lib/mixins/fontFace';
import { ThemeT } from 'presentation/context/Theme';

const fontsCss = (theme: ThemeT): SerializedStyles => css`
    html,
    body {
        font-family: ${theme.font.family.base}, sans-serif;
    }

    ${fontFace({
        fontFamily: theme.font.family.base,
        fontFilePath: '/fonts/Roboto400',
        fileFormats: ['woff2', 'woff'],
        fontWeight: theme.font.weight.regular,
        fontStyle: 'normal',
        fontDisplay: 'swap',
    })}
`;

export default fontsCss;
