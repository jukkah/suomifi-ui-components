import { css } from 'styled-components';
import { LabelTextProps } from './LabelText';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';
import { Omit } from '../../../utils/typescript';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Omit<LabelTextProps, 'children'>) => css`
    &.fi-label-text {
      & .fi-label-text_label-span {
        ${font({ theme })('actionElementInnerTextBold')};
        display: block;
        margin-bottom: ${theme.spacing.xs};
        color: ${theme.colors.blackBase};
      }
    }
  `,
);
