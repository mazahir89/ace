import styled from "styled-components";
import ArrowSVG from "./assets/arrow_drop_down.svg";

interface OptionProps {
  isSelectOpen: boolean;
}

export const OptionWrap = styled.ul<OptionProps>`
  position: absolute;
  top: 57px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px lightgrey;
  width: 240px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 232px;
  overflow-y: scroll;
  overflow-x: hidden;
  outline: none;
  z-index: 2;
  font-family: "Open Sans";
`;

export const Option = styled.li`
  font-size: 16px;
  background-color: white;
  border: none;
  padding: 8px;
  text-align: left;
  cursor: pointer;
  margin: 0;

  &[aria-selected="true"],
  :hover {
    background-color: #dfe1e6;
  }

  &:hover {
    background-color: #ebecf0;
  }
`;

export const Selected = styled.div`
  display: flex;
  border: none;
  font-size: 16px;
  color: #282828;
  font-family: "Open Sans";
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 0;
  background-color: white;
  overflow-wrap: break-word;
  resize: none;
  padding: 0 16px 0 9px;
  pointer-events: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-top: 24px solid transparent;
  flex: 1;
`;

export const ArrowIcon = styled(ArrowSVG)`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 8px;
  top: 16px;
`;
