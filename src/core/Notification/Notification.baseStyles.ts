import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  justify-content: space-between;
  padding-bottom: 10px;
  &.fi-notification {
    & .fi-notification_element-wrapper {
      overflow: hidden;
    }

    & .fi-notification_text-content-wrapper {
      padding-top: 18px;
      padding-left: 20px;
      flex-grow: 1;
      & .fi-notification_content {
        vertical-align: middle;
        & .fi-notification_contentWrapper {
          padding-top: 3px;
          ${font(theme)('bodyTextSmall')}
        }
      }
    }
    & .fi-notification_heading {
      ${font(theme)('bodySemiBold')}
      margin: 1px 0 0 0;
    }
    & .fi-notification_action-element-wrapper {
      padding: 20px 26px 19px 87px;
      & .fi-button {
        margin-top: ${theme.spacing.xs};
        margin-right: ${theme.spacing.s};
      }
      & .fi-button:first-child {
        margin-top: 0;
      }
    }
    .fi-notification_icon-wrapper {
      padding-top: 21px;
      flex: 0;
      & .fi-notification_icon {
        height: 24px;
        width: 24px;
      }
    }
    & .fi-notification_close-button {
      ${font(theme)('bodyTextSmall')}
      flex: 1 0 auto;
      flex-wrap: nowrap;
      display: flex;
      box-sizing: border-box;
      margin-top: 11px;
      margin-right: -5px;
      margin-bottom: 0;
      max-width: 50%;
      min-width: 40px;
      text-align: right;
      padding: 7px 8px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;
      flex-grow: 0;
      & .fi-icon {
        width: 14px;
        height: 14px;
        margin-top: 6px;
        padding-left: 7px;
      }

      &:focus-visible {
        outline: 0;
        position: relative;

        &:after {
          ${theme.focus.absoluteFocus}
        }
      }
      &:active {
        background: ${theme.gradients.whiteBaseToDepthLight1};
      }
      &:hover {
        border-color: ${theme.colors.blackBase};
      }
    }
    & .fi-notification_style-wrapper {
      padding: 0 33px 10px 41px;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
    }

    /* Status variant styles */
    &--neutral {
      border-top: 4px solid ${theme.colors.accentSecondary};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.accentSecondary};
      }
    }
    &--error {
      border-top: 4px solid ${theme.colors.alertBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }
    /** Small screen variant styles */
    &.fi-notification--small-screen {
      padding-bottom: 20px;
      & .fi-notification_text-content-wrapper {
        padding-top: 15px;
        padding-left: 12px;
        padding-right: 12px;
        display: flex;
        flex-direction: column;
      }
      & .fi-notification_close-button {
        justify-content: flex-end;
        flex-direction: row;
        padding: 13px;
        margin: 3px;
        svg {
          padding: 0;
          margin: 0;
        }
      }
      & .fi-notification_style-wrapper {
        padding: 0;
      }
      & .fi-notification_icon-wrapper {
        padding-top: 17px;
        padding-left: 17px;
      }
      & .fi-notification_action-element-wrapper {
        padding: 0 15px;
        & .fi-button {
          width: 100%;
          margin-top: ${theme.spacing.s};
          margin-right: 0;
        }
      }
    }
  }
`;
