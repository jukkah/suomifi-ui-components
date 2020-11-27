import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { AutoId } from '../../../utils/AutoId';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv } from '../../../reset';
import { baseStyles } from './Expander.baseStyles';
import {
  ExpanderGroupConsumer,
  ExpanderGroupProviderState,
} from '../ExpanderGroup/ExpanderGroup';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;

export interface ExpanderProviderState {
  /** Callback for communicating ExpanderTitle button event to Expander  */
  onToggleExpander: () => void;
  /** Open state for expander */
  open: boolean;
  /** Id for expander button */
  titleId: string | undefined;
  /** Id for expander content */
  contentId: string | undefined;
}

const defaultProviderValue: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: undefined,
  contentId: undefined,
};

const {
  Provider: ExpanderProvider,
  Consumer: ExpanderConsumer,
} = React.createContext(defaultProviderValue);

interface InternalExpanderProps {
  /**
   * Children, extend type ExpanderTitleBaseProps or ExpanderContentBaseProps
   * ExpanderProviderState context is used to communicate between title, content and expander
   */
  children: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Id for expander, must be unique. Duplicate id's break ExpanderGroup functionality.
   * Autogenerated if not provided
   */
  id?: string;
  /** Default status of expander open
   * @default false
   */
  defaultOpen?: boolean;
  /** Controlled open property */
  open?: boolean;
  /** Event handler to execute when clicked */
  onOpenChange?: (open: boolean) => void;
  consumer?: ExpanderGroupProviderState;
}

export interface ExpanderProps extends InternalExpanderProps, TokensProp {}

export interface ExpanderTitleBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Expander consumer for open state and toggle open callback */
  consumer: ExpanderProviderState;
}

export interface ExpanderContentBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Expander consumer for open state */
  consumer: ExpanderProviderState;
}

interface BaseExpanderProps extends InternalExpanderProps {
  id: string;
}

class BaseExpander extends Component<BaseExpanderProps> {
  state: ExpanderState = {
    openState: this.props.defaultOpen || false,
  };

  constructor(props: BaseExpanderProps) {
    super(props);
    if (!!props.consumer) {
      const defaultOpen =
        props.open !== undefined ? props.open : props.defaultOpen || false;
      props.consumer.onExpanderOpenChange(props.id, defaultOpen);
    }
  }

  componentDidUpdate(prevProps: ExpanderProps, prevState: ExpanderState) {
    const { consumer, open } = this.props;
    const controlled = open !== undefined;
    if (
      !!consumer &&
      prevProps.id !== undefined &&
      prevProps.id !== this.props.id
    ) {
      consumer.onExpanderOpenChange(prevProps.id, undefined);
    }
    if (
      !!consumer &&
      consumer.toggleAllExpanderState !==
        prevProps.consumer?.toggleAllExpanderState
    ) {
      if (
        (!controlled &&
          !!this.state.openState !== consumer.toggleAllExpanderState.toState) ||
        (controlled && open !== consumer.toggleAllExpanderState.toState)
      ) {
        this.handleOpenChange();
      }
    }
    if (
      (!controlled && prevState.openState !== this.state.openState) ||
      (controlled && prevProps.open !== open)
    ) {
      if (!!consumer && this.props.id !== undefined) {
        const currentState = controlled ? !!open : this.state.openState;
        consumer.onExpanderOpenChange(this.props.id, currentState);
      }
    }
  }

  componentWillUnmount() {
    if (!!this.props.consumer && !!this.props.consumer.onExpanderOpenChange) {
      this.props.consumer.onExpanderOpenChange(this.props.id, undefined);
    }
  }

  handleOpenChange = () => {
    const { open, onOpenChange } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    const newOpenState = controlled ? !!open : !openState;
    if (!controlled) {
      this.setState({ openState: newOpenState });
    }
    if (!!onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  render() {
    const {
      id,
      open,
      defaultOpen,
      onOpenChange,
      className,
      children,
      consumer,
      ...passProps
    } = this.props;
    const openState = open !== undefined ? !!open : this.state.openState;
    const titleId = `${id}_title`;
    const contentId = `${id}_content`;

    return (
      <HtmlDiv
        id={id}
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <ExpanderProvider
          value={{
            open: openState,
            contentId,
            titleId,
            onToggleExpander: this.handleOpenChange,
          }}
        >
          {children}
        </ExpanderProvider>
      </HtmlDiv>
    );
  }
}

const StyledExpander = styled(
  ({
    tokens,
    id: propId,
    ...passProps
  }: ExpanderProps & InternalTokensProp) => (
    <AutoId id={propId}>
      {(id) => <BaseExpander id={id} {...passProps} />}
    </AutoId>
  ),
)`
  ${(props) => baseStyles(props)};
`;

interface ExpanderState {
  openState: boolean;
}

/**
 * <i class="semantics" />
 * Hide or show content with always visible title
 */
export class Expander extends Component<ExpanderProps> {
  render() {
    return (
      <ExpanderGroupConsumer>
        {(consumer) => (
          <StyledExpander
            {...withSuomifiDefaultProps(this.props)}
            consumer={consumer}
          />
        )}
      </ExpanderGroupConsumer>
    );
  }
}

export { ExpanderConsumer };
