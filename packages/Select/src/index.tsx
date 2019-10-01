import React, { PureComponent, KeyboardEvent, FocusEvent } from "react";

import { styled } from "@ace/input";
import { Option, OptionWrap, Selected, ArrowIcon } from "./styled";

const { Wrap, Label, Line, Hint, Error, Container } = styled;

const keyCodes = {
  enter: 13,
  space: 32,
  arrowUp: 38,
  arrowDown: 40,
  tab: 9,
  esc: 27,
  home: 36,
  end: 35
};

type Option = {
  key: string;
  value: string;
  style?: React.CSSProperties;
};

type Props = {
  name?: string;
  label: string;
  options: Option[];
  required?: boolean;
  onChange: (name: string, selectedOption: Option) => void;
  hint?: string;
  error?: string;
};

const defaultProps: Partial<Props> = {
  required: false
};

interface State {
  isFocused: boolean;
  isSelectOpen: boolean;
  selectedOption: Option;
  options: Option[];
}

class Select extends PureComponent<Props, State> {
  static defaulProps = defaultProps;

  private wrapRef: any = React.createRef<HTMLDivElement>();

  private optionWrapRef: any = React.createRef<HTMLUListElement>();

  private optionRefs: {
    [string: string]: any;
  };

  constructor(props: Props) {
    super(props);
    const { options, required } = props;
    if (!required) {
      options.unshift({
        key: "None",
        value: "",
        style: { fontStyle: "italic" }
      });
    }
    this.state = {
      isFocused: false,
      isSelectOpen: false,
      selectedOption: {
        key: "",
        value: ""
      },
      options
    };
  }

  getNextOption = () => {
    const { selectedOption } = this.state;
    const { options } = this.state;
    const nextIndex = options.indexOf(selectedOption) + 1;
    return options[nextIndex] || selectedOption;
  };

  getPreviousOption = () => {
    const { selectedOption } = this.state;
    const { options } = this.state;
    const previousIndex = options.indexOf(selectedOption) - 1;
    return options[previousIndex] || selectedOption;
  };

  triggerOptionSelected = () => {
    const { selectedOption } = this.state;
    const { onChange, name } = this.props;
    onChange(name, selectedOption);
  };

  handleWrapKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.enter || event.keyCode === keyCodes.space) {
      this.handleOpen();
    }
  };

  handleWrapFocus = (event: FocusEvent) => {
    event.stopPropagation();
    this.setState(() => ({
      isFocused: true
    }));
  };

  handleOpen = () => {
    const { selectedOption, isSelectOpen } = this.state;
    const { options } = this.state;
    const firstOption = options[0];

    if (isSelectOpen) {
      this.handleOptionWrapClose();
    } else {
      const optionToSelect = selectedOption.key ? selectedOption : firstOption;

      setImmediate(() => {
        this.setState(() => ({
          isSelectOpen: true,
          selectedOption: optionToSelect
        }));
        this.optionWrapRef.current.focus();

        // focus active element
        const target = this.optionRefs[optionToSelect.key];
        target.parentNode.scrollTop = target.offsetTop;
      });
    }
  };

  handleBlur = (event: FocusEvent) => {
    event.stopPropagation();
    // if IE11
    let target: EventTarget | Element | null = event.relatedTarget;
    if (target === null) {
      target = document.activeElement;
    }
    const wrapNode = this.wrapRef.current;
    if (wrapNode && !wrapNode.contains(target)) {
      this.setState(() => ({
        isSelectOpen: false
      }));
      this.triggerOptionSelected();
    }
    this.setState(() => ({
      isFocused: false
    }));
  };

  handleOptionWrapClose = () => {
    this.setState(() => ({
      isSelectOpen: false
    }));
    setImmediate(() => {
      this.wrapRef.current.focus();
    });
  };

  handleOptionWrapKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    switch (event.keyCode) {
      case keyCodes.arrowDown: {
        const nextOption = this.getNextOption();
        this.setState({
          selectedOption: nextOption
        });
        break;
      }
      case keyCodes.arrowUp: {
        const previousOption = this.getPreviousOption();
        this.setState({
          selectedOption: previousOption
        });
        break;
      }
      case keyCodes.enter:
      case keyCodes.esc:
      case keyCodes.space: {
        this.handleOptionWrapClose();
        this.triggerOptionSelected();
        break;
      }
      case keyCodes.tab: {
        if (event.shiftKey) {
          this.handleOptionWrapClose();
          this.triggerOptionSelected();
        }
        break;
      }
      case keyCodes.home: {
        const { options } = this.state;
        const firstOption = options[0];
        this.setState({
          selectedOption: firstOption
        });
        break;
      }
      case keyCodes.end: {
        const { options } = this.state;
        const lastOption = options[options.length - 1];
        this.setState({
          selectedOption: lastOption
        });
        break;
      }
      default:
    }
  };

  handleOptionClick = (option: Option) => (event: any) => {
    event.stopPropagation();
    this.wrapRef.current.focus();
    this.setState(() => ({
      isSelectOpen: false,
      selectedOption: option
    }));
    setImmediate(() => {
      this.triggerOptionSelected();
    });
  };

  renderOptions = (labelId: string) => {
    const { required } = this.props;
    const { options } = this.state;

    const { isSelectOpen, selectedOption } = this.state;
    return (
      <OptionWrap
        tabIndex={-1}
        isSelectOpen={isSelectOpen}
        ref={this.optionWrapRef}
        role="listbox"
        aria-labelledby={labelId}
        aria-activedescendant={selectedOption.key}
        onKeyDown={this.handleOptionWrapKeyDown}
      >
        {options.map(option => (
          <Option
            id={option.key}
            key={option.key}
            role="option"
            aria-selected={option.key === selectedOption.key}
            onClick={this.handleOptionClick(option)}
            title={option.key}
            ref={(ref: any) => {
              this.optionRefs = {
                ...this.optionRefs,
                [option.key]: ref
              };
            }}
            style={option.style}
          >
            {option.key}
          </Option>
        ))}
      </OptionWrap>
    );
  };

  render() {
    const { isFocused, selectedOption, isSelectOpen } = this.state;
    const { label, hint, error } = this.props;
    const common = {
      isFocused,
      error,
      value: selectedOption.key
    };
    const labelId = `${label.replace(/\s/g, "")}-label`;
    const buttonId = `${label.replace(/\s/g, "")}-button`;
    const selectedTextId = `${label.replace(/\s/g, "")}-text`;

    return (
      <Wrap>
        <Container
          as="div"
          id={buttonId}
          tabIndex={0}
          ref={this.wrapRef}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isSelectOpen}
          aria-labelledby={`${labelId} ${buttonId} ${selectedTextId}`}
          onFocus={this.handleWrapFocus}
          onClick={this.handleOpen}
          onKeyDown={this.handleWrapKeyPress}
          onBlur={this.handleBlur}
          {...common}
        >
          <Label as="span" id={labelId} {...common}>
            {label}
          </Label>
          {isSelectOpen && this.renderOptions(labelId)}
          <Selected id={selectedTextId}>{selectedOption.key}</Selected>
          <Line isFocused={isFocused} />
          <ArrowIcon />
        </Container>
        {hint && <Hint>{hint}</Hint>}
        {error && <Error>{error}</Error>}
      </Wrap>
    );
  }
}

export default Select;
