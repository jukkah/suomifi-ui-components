import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-clear-button {
    cursor: pointer;
    pointer-events: all;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      outline: none;
      &:after {
        ${theme.focus.absoluteFocus}
      }
    }

    & .fi-clear-button_icon {
      width: 16px;
      height: 16px;
      fill: ${theme.colors.highlightDark1};
    }
  }
`;
