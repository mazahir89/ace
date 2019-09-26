import styled, { css } from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: calc(100% - 67px);
  margin: 0 auto;
  -moz-box-sizing: inherit;
`;

export const RangeInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-50% + 2px)); 

  -webkit-tap-highlight-color: transparent;

  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  background: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  width: 100%;

  @media only screen and (max-width: 600px) {
    outline: none;
  }

  ::-ms-tooltip {
    display: none;
  }

  ::-ms-track {
    height: 8px;
    width: 100%;
    border-width: 16px 0;
    background: transparent;
    border-color: transparent;
    color: transparent;
    cursor: pointer;
  }

  ::-ms-fill-lower {
    background: transparent;
  }
  ::-ms-fill-upper {
    background: transparent;
  }

  ::-webkit-slider-thumb {
    height: 20px;
    width: 20px;

    -webkit-appearance: none;
  }

  ::-moz-range-thumb {
    height: 20px;
    width: 20px;

    -moz-appearance: none;
  }

  ::-webkit-slider-thumb {
    background: rgb(119, 102, 84);
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }

  ::-moz-range-thumb {
    height: 40px;
    width: 40px;
    background: rgb(119, 102, 84);
    border-radius: 50%;
    border: none;
  }

  ::-ms-thumb {
    height: 40px;
    width: 40px;
    background: rgb(119, 102, 84);
    border-radius: 50%;
    border: 0;
    -ms-appearance: none;
  }
`;

export const SliderParts = styled.span`
  height: 4px;
  position: relative;

  width: calc(100% - 40px);
  transform: translateY(-50%);

  & > * {
    position: absolute;
  }
`;

export const SliderFill = styled.span<{ width: number }>`
  height: 8px;
  z-index: 1;
  background: rgba(119, 102, 84, 0.6);
  border-radius: 30px 30px 30px 30px;
  ${({ width }) => css`
    width: ${(e) => {
    if (width > 100) {
      return 100;
    }
    if (width < 0) {
      return 0;
    }
    return width;
  }}%;
  `}
`;
export const SliderTrack = styled.span`
  height: 8px;
  width: 100%;
  background: rgb(239, 232, 223);;
  border-radius: 30px 30px 30px 30px;

  ::-ms-track {
    height: 8px;
    width: 100%;
    background: rgb(239, 232, 223);;
    border-radius: 30px 30px 30px 30px;
  }
`;

export const Amount = styled.div<{ position: number }>`
  top: -100px;
  color: black;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    background: white;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.14);
    & > span:first-of-type {
      line-height: 33px;
      font-size: 24px;
    }
    & > span:last-of-type {
      white-space: nowrap;
      color: rgb(102, 102, 102);
      font-family: OpenSans-Bold;
      font-size: 14px;
      font-weight: bold;
      line-height: 19px;
      z-index: 2;
      position: relative;
    }
  }

  :before {
    
    content: "";
    position: absolute;
    top: 93%;
    left: 48.5%;
    transform: rotate(45deg) translateX(-50%);
    height: 16px;
    width: 16px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.14);
    z-index: -1;
  }

  :after {
    content: "";
    position: absolute;
    top: 93%;
    left: 48.5%;
    transform: rotate(45deg) translateX(-50%);
    height: 16px;
    width: 16px;
    background: rgb(255, 255, 255);
  }

  ${({ position }) => css`
    transform: translateX(-50%);
    left: calc(${position} / 100 * 100%);
  `}
`;
