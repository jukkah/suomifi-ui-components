import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './Chip.baseStyles';
import { HtmlButton, HtmlSpan } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { Icon } from '../../Icon/Icon';
import { logger } from '../../../utils/logger';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';

const baseClassName = 'fi-chip';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}--icon`;
const contentClassName = `${baseClassName}--content`;
const removableClassName = `${baseClassName}--removable`;
const buttonClassName = `${baseClassName}--button`;

type ChipVariant = 'static' | 'default';

interface InternalChipProps {
  /** Chip element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
  /**
   * Event handler to execute when clicked
   */
  onClick?: () => void;
  /**
   * Show X-icon next to the content to mark the chip as removable
   * @default false
   */
  removable?: boolean;
  /** Aria-label attribute to let screen reader users know pressing the button will remove the chip/selection  */
  actionLabel?: string;
  /**
   * default | static - use default for an interactive chip and static for a purely visual chip.
   * @default default
   */
  variant?: ChipVariant;
}

export interface ChipProps extends InternalChipProps, TokensProp {}

class DefaultChip extends Component<ChipProps> {
  render() {
    const {
      className,
      children,
      onClick,
      removable,
      actionLabel,
      variant,
      disabled = false,
      ...passProps
    } = this.props;

    if (removable && !actionLabel) {
      logger.error(
        'Provide actionLabel to communicate removability to screen readers',
      );
    }

    if (variant === 'static') {
      return (
        <HtmlSpan
          className={classnames(baseClassName, className, {
            [disabledClassName]: !!disabled,
            [removableClassName]: !!removable,
          })}
          {...passProps}
        >
          <HtmlSpan className={contentClassName}>{children}</HtmlSpan>
        </HtmlSpan>
      );
    }
    return (
      <HtmlButton
        className={classnames(baseClassName, buttonClassName, className, {
          [disabledClassName]: !!disabled,
          [removableClassName]: !!removable,
        })}
        disabled={disabled}
        onClick={onClick}
        {...passProps}
      >
        <HtmlSpan className={contentClassName}>{children}</HtmlSpan>
        {!!removable && (
          <>
            <Icon
              mousePointer={true}
              icon="close"
              color="currentColor"
              className={iconClassName}
              aria-hidden={true}
            />
            <VisuallyHidden>{actionLabel}</VisuallyHidden>
          </>
        )}
      </HtmlButton>
    );
  }
}

const StyledChip = styled(
  ({ tokens, ...passProps }: ChipProps & InternalTokensProp) => (
    <DefaultChip {...passProps} />
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;
/*  Might want to implement passProps in the withSuomifiDefaultProps as well */

export class Chip extends Component<ChipProps> {
  static static = (props: ChipProps) => {
    const passProps = withSuomifiDefaultProps(props);
    return <StyledChip {...passProps} variant="static" />;
  };

  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledChip {...passProps} />;
  }
}
