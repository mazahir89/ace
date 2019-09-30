import React, { useState } from "react";

import * as styled from "./styled";

const {
  Container,
  Error,
  ErrorIcon,
  Hint,
  InputChild,
  Label,
  Line,
  Wrap
} = styled;

// @ts-ignore
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isFocused?: boolean;
  error?: string;
  hint?: string;
  /**
   * If set to true, the input
   * will get a width of 100%
   */
  fluid?: boolean;
  // if Textarea is used
  rows?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Polymorphic prop, it is used
   * to change the input tag to
   * something else, e.x. textarea
   */
  as?: keyof JSX.IntrinsicElements;
}

function Input({
  as,
  id,
  label,
  value,
  error,
  hint,
  fluid,
  isFocused: isFocusedProp,
  onChange,
  ...props
}: Props) {
  const identifier = id || `input-${label}`;
  const [isFocused, setFocus] = useState(!!isFocusedProp);
  return (
    <Wrap fluid={fluid}>
      <Container>
        <Label
          htmlFor={identifier}
          isFocused={isFocused}
          value={value}
          error={error}
        >
          {label}
        </Label>
        <InputChild
          as={as}
          id={identifier}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          error={error}
          onChange={onChange}
          {...props}
        />
        <Line isFocused={isFocused} error={error} />
        {error && <ErrorIcon />}
      </Container>
      {hint && <Hint>{hint}</Hint>}
      {error && <Error>{error}</Error>}
    </Wrap>
  );
}

export { styled };
export { Props };
export default Input;
