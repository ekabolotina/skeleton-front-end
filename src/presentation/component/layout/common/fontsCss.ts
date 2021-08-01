import { css, SerializedStyles } from '@emotion/react';
import { fontFace } from 'polished';
import { ThemeT } from 'presentation/context/Theme';

const fontsCss = (theme: ThemeT): SerializedStyles => css`
    html,
    body {
        font-family: ${theme.font.family.base}, sans-serif;
    }

    ${fontFace({
        fontFamily: theme.font.family.base,
        // Replace it
        fontFilePath: '/fonts/Pragmatica-Book',
        fileFormats: ['eot', 'woff', 'woff2', 'ttf'],
        fontWeight: theme.font.weight.regular,
        fontStyle: 'normal',
        fontDisplay: 'swap',
    })}
`;

export default fontsCss;
