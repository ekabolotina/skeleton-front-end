import { css, SerializedStyles } from '@emotion/react';
import { normalize } from 'polished';
import { ThemeT } from 'presentation/context/Theme';

const globalCss = (theme: ThemeT): SerializedStyles => css`
    ${normalize()}
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
    h2 {
        margin: 0;
    }

    a {
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
