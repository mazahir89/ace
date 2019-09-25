import React, { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends CSSProperties {
  children?: ReactNode
  as?: keyof JSX.IntrinsicElements
}

function Box({
  as,
  children,
  ...props
}: Props) {
  return (
    <Wrap
      as={as}
      style={props}
    >
      {children}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
`;

export default Box;
