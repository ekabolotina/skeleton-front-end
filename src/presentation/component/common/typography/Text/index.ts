import styled from '@emotion/styled';
import { ThemeT } from 'presentation/context/Theme';

export type ColorT = keyof ThemeT['colors'];
export type FontWeightT = keyof ThemeT['font']['weight'];
export type FontFamilyT = keyof ThemeT['font']['family'];

export type TextPropsT = {
    size?: number;
    color?: ColorT;
    weight?: FontWeightT;
    family?: FontFamilyT;
    opacity?: number;
};

const Text = styled.span<TextPropsT>`
    font-family: ${({ theme, family }) => (family ? theme.font.family[family] : 'inherit')};
    font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
    font-weight: ${({ theme, weight }) => (weight ? theme.font.weight[weight] : 'inherit')};
    opacity: ${({ opacity = 1 }) => opacity};
    color: ${({ theme, color }) => (color ? theme.colors[color] : 'inherit')};
`;

export default Text;
