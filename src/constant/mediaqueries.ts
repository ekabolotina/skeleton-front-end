import { css, SerializedStyles } from '@emotion/react';
import Breakpoint from 'enum/Breakpoint';

const lower = (bp: Breakpoint): string => `(max-width: ${bp - 1}px)`;
const greater = (bp: Breakpoint): string => `(min-width: ${bp}px)`;
const between = (bpFrom: Breakpoint, bpTo: Breakpoint) => `${greater(bpFrom)} and ${lower(bpTo)}`;

export const rule = {
    lowerXs: lower(Breakpoint.Xs),
    lowerSm: lower(Breakpoint.Sm),
    lowerMd: lower(Breakpoint.Md),
    lowerLg: lower(Breakpoint.Lg),
    lowerXl: lower(Breakpoint.Xl),
    greaterXs: greater(Breakpoint.Xs),
    greaterSm: greater(Breakpoint.Sm),
    greaterMd: greater(Breakpoint.Md),
    greaterLg: greater(Breakpoint.Lg),
    greaterXl: greater(Breakpoint.Xl),
    betweenSmMd: between(Breakpoint.Sm, Breakpoint.Md),
    betweenXsSm: between(Breakpoint.Xs, Breakpoint.Sm),
};

type RuleT = keyof typeof rule;

/**
 * @example
 *
 * styled.div`
 *     ${mq.lowerSm} {
 *         color: red;
 *     }
 * `
 *
 * // same as above
 * styled.div`
 *     @media (max-width: ${Breakpoint.Sm}) {
 *         color: red;
 *     }
 * `
 * */
export const mq = (Object.keys(rule) as RuleT[]).reduce(
    (acc, bp) => ({
        ...acc,
        [bp]: `@media ${rule[bp]}`,
    }),
    {} as Record<RuleT, string>,
);

/**
 * @example
 *
 * styled.div`${hidden.lowerSm}`;
 *
 * // same as above
 * styled.div`
 *     @media (max-width: ${Breakpoint.Sm}) {
 *         display: none;
 *     }
 * `;
 * */
export const hidden = (Object.keys(mq) as RuleT[]).reduce(
    (acc, bp) => ({
        ...acc,
        [bp]: css`
            ${mq[bp]} {
                display: none;
            }
        `,
    }),
    {} as Record<RuleT, SerializedStyles>,
);
