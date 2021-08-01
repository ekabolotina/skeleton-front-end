import styled from '@emotion/react';
import { ThemeT } from 'presentation/context/Theme';

declare module '@emotion/react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends ThemeT {}
}

export default styled;
