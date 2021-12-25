import { css, SerializedStyles } from '@emotion/react';
import normalize from 'polished/lib/mixins/normalize';
import { ThemeT } from 'presentation/context/Theme';
import fontsCss from 'presentation/component/layout/common/fontsCss';

const globalCss = (theme: ThemeT): SerializedStyles => css`
    ${normalize()};
    ${fontsCss(theme)};

    html,
    body {
        margin: 0;
        padding: 0;
        background-color: ${theme.colors.base};
        color: ${theme.colors.text};
        font-size: 16px;
        line-height: 1.2;
        -webkit-font-smoothing: antialiased;
        -webkit-overflow-scrolling: touch;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    p,
    h4,
    h3,
    h2,
    h1 {
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        margin: 0;
        padding-left: 0;
        list-style: none;
    }

    button {
        padding: 0;
        border: none;
        cursor: pointer;
        background-color: transparent;
        font: inherit;
        line-height: inherit;
        appearance: none;
    }

    input::-ms-clear {
        display: none;
    }
`;

export default globalCss;
