import React, { Component, MouseEvent, ReactNode } from 'react';
import { HtmlButton, HtmlButtonProps } from '../../reset';

export interface ButtonProps extends HtmlButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
  /**
   * Button element content
   */
  children?: ReactNode;
}

export class Button extends Component<ButtonProps> {
  static defaultProps = {
    disabled: false,
  };

  render() {
    const { disabled } = this.props;
    return <HtmlButton {...this.props} aria-disabled={disabled} tabIndex={0} />;
  }
}
