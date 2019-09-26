import styled from 'styled-components';
import { animated } from 'react-spring';

export const thumbSide = 40;

export const Wrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  min-height: 40px;
  width: 100%;
  padding: 0 20px;

  box-sizing: border-box;
  /* overflow: hidden; */
`;

export const LineRounder = styled.div`
  position: absolute;

  width: calc(100% - ${thumbSide}px);
  height: 8px;
  border-radius: 4px;

  overflow: hidden;
`;

export const SelectedLine = styled(animated.div)`
  display: flex;
  position: absolute;
  transform-origin: top left;

  width: 100%;
  height: 8px;
  z-index: 1;

  background: #52af77;

  overflow: hidden;
`;

export const NonSelectedLine = styled.div`
  display: flex;
  position: absolute;

  height: 8px;
  width: calc(100% - ${thumbSide}px);
  border-radius: 4px;

  background: #bee1cc;

  overflow: hidden;
`;

export const Guide = styled(animated.div)`
  display: block;
  position: relative;

  width: 100%;
  height: 0;

  z-index: 2;
  box-sizing: border-box;
`;

export const Thumb = styled(animated.button)`
  display: block;
  position: relative;
  left: 0;
  transform: translate(-50%, calc(-50% + 4px));

  padding: 0;
  width: ${thumbSide}px;
  height: ${thumbSide}px;
  border-radius: 50%;
  z-index: 2;

  border: none;
  background: #52af77;

  outline: none;
  cursor: pointer;
`;

export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  transform: translate(calc(-50% + 20px));
  position: absolute;
  top: -80px;

  padding: 8px 16px;

  background-color: white;
  box-shadow: 0 1px 3px lightgrey;

  > :nth-child(n + 2) {
    white-space: nowrap;
    color: rgb(102, 102, 102);
    font-family: OpenSans-Bold;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
  }

  > :first-child {
    line-height: 33px;
    font-size: 24px;
  }

  /* ::before {
      content: "";
      position: absolute;
      top: 93%;
      left: 48.5%;
      transform: rotate(45deg) translateX(-50%);
      height: 16px;
      width: 16px;
      background: rgb(255, 255, 255);
      box-shadow: 0 1px 3px lightgrey;
    } */
`;
