import styled, { css } from "styled-components";

import ErrorSVG from "./assets/round-error.svg";

import { Props as InputProps } from ".";

type ChildrenProps = Pick<
  InputProps,
  "isFocused" | "value" | "error" | "fluid"
>;

export const Wrap = styled.div<ChildrenProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: flex-start;
  width: 240px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  ${({ fluid }) =>
    fluid &&
    css`
      width: 100%;
    `}
`;

export const Container = styled.div`
  display: flex;
  min-height: 56px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.07), 0 2px 2px 0 rgba(0, 0, 0, 0.06),
    0 1px 3px 0 rgba(0, 0, 0, 0.14);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  outline: none;
`;

export const Label = styled.label<ChildrenProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 16px;
  left: 8px;
  font-size: 1rem;
  transition-property: all;
  transition-duration: 0.2s;
  cursor: text;
  font: 1rem "Open Sans";

  ${({ isFocused, value, error }) =>
    (isFocused || value || error) &&
    css`
      transform: scale(0.75);
      top: 4px;
      transform-origin: top left;
    `}

  ${({ error }) =>
    error &&
    css`
      color: #bb1b18;
    `}
`;

export const InputChild = styled.input<ChildrenProps>`
  display: flex;
  flex: 1;
  border: none;
  border-top: 24px solid transparent;
  padding: 0 8px 8px 8px;
  font: 1rem "Open Sans";
  outline: none;
  margin: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  ${({ error }) =>
    error &&
    css`
      padding-right: 32px;
    `}
`;

export const Line = styled.span<ChildrenProps>`
  display: flex;
  width: 0;
  height: 2px;
  background-color: #4f8a10;
  transition: width 0.2s ease-in-out;
  position: absolute;
  bottom: 0;
  left: 0;

  ${({ isFocused, error }) =>
    (isFocused || error) &&
    css`
      width: 100%;
    `}

  ${({ error }) =>
    error &&
    css`
      background-color: #d8000c;
    `}
`;

export const Hint = styled.span`
  padding: 4px 8px;
  font-size: 14px;
  word-break: break-word;
`;

export const Error = styled(Hint)`
  color: #d8000c;
`;

export const ErrorIcon = styled(ErrorSVG)`
  fill: #d8000c;
  position: absolute;
  bottom: 10px;
  right: 8px;
  width: 20px;
  height: 20px;
`;
