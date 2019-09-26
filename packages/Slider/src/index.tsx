import React, { useState, useEffect } from 'react';
import Measure from 'react-measure';
import { useGesture } from 'react-use-gesture';
import clamp from 'lodash.clamp';

import {
  Guide,
  LineRounder,
  NonSelectedLine,
  SelectedLine,
  Thumb,
  Wrap,
  Popup,
  thumbSide
} from './styled';

function round(number: number, increment: number, offset: number) {
  return Math.round((number - offset) / increment) * increment + offset;
}

interface Props {
  id?: string;
  min?: number;
  max?: number;
  initial?: number;
  step?: number;
  onChange: (currentValue: number) => void;
  value?: number;
}

const keyCodes = {
  arrowUp: 38,
  arrowDown: 40,
  arrowLeft: 37,
  arrowRight: 39,
  home: 36,
  end: 35,
  pageUp: 33,
  pageDown: 34
};

function Slider({
  id,
  min = 0,
  max = 100,
  initial = min,
  step = 1,
  onChange,
  value
}: Props) {
  const initialPercentage = initial ? (initial - min) / (max - min) : 0;

  const [selectedPercent, setPercent] = useState([initialPercentage]);
  const [selectedValue, setValue] = useState([initial || min]);
  const [upperXBoundary, setBoundary] = useState(0);

  function calcSelectedValue(deltaX: number, temp: number) {
    const newSelectedValue = round(
      clamp((deltaX / upperXBoundary + temp) * (max - min) + min, min, max),
      step,
      0
    );

    setValue([newSelectedValue]);
  }

  function calcSelectedPercent(calcInput = selectedValue[0]) {
    const newSelectedPercent = (calcInput - min) / (max - min);
    setPercent([newSelectedPercent]);
  }

  const bind = useGesture({
    onDrag: ({ delta: [deltaX], temp = selectedPercent }) => {
      calcSelectedValue(deltaX, temp[0]);
      calcSelectedPercent();

      return temp;
    },
    onDragEnd: () => {
      onChange(selectedValue[0]);
    }
  });

  useEffect(() => {
    calcSelectedPercent(value);
    setValue([value]);
  }, [value]);

  function calcScale() {
    return {
      transform: `scaleX(${selectedPercent})`
    };
  }

  function calcTranslate() {
    return {
      transform: `translate(${upperXBoundary * selectedPercent[0] - 20}px)`
    };
  }

  function handleThumpPress(event: React.KeyboardEvent<HTMLButtonElement>) {
    let newValue: number = selectedValue[0];
    switch (event.keyCode) {
      case keyCodes.arrowUp:
      case keyCodes.arrowRight: {
        newValue = selectedValue[0] + step;
        break;
      }
      case keyCodes.arrowDown:
      case keyCodes.arrowLeft: {
        newValue = selectedValue[0] - step;
        break;
      }
      case keyCodes.home: {
        newValue = min;
        break;
      }
      case keyCodes.end: {
        newValue = max;
        break;
      }
      case keyCodes.pageUp: {
        newValue = selectedValue[0] + step * 2;
        break;
      }
      case keyCodes.pageDown: {
        newValue = selectedValue[0] - step * 2;
        break;
      }
      default: {
        break;
      }
    }
    newValue = clamp(newValue, min, max);
    setValue([newValue]);
    onChange(newValue);
    calcSelectedPercent(newValue);
  }

  return (
    <Measure
      bounds
      onResize={(dimensions) => {
        setBoundary(dimensions.bounds.width - thumbSide);
      }}
    >
      {({ measureRef }) => (
        <Wrap ref={measureRef}>
          <LineRounder>
            <SelectedLine style={calcScale()} />
          </LineRounder>
          <Thumb
            role="slider"
            aria-orientation="horizontal"
            aria-valuenow={selectedValue[0]}
            {...bind()}
            style={calcTranslate()}
            onKeyDown={handleThumpPress}
          >
            <Popup>
              <span>
                {selectedValue[0] > 10000 ? '10000+' : selectedValue[0]}
              </span>
              <span>€ per month</span>
            </Popup>
          </Thumb>
          <NonSelectedLine />
        </Wrap>
      )}
    </Measure>
  );
}

export { Props };
export {
  Guide,
  LineRounder,
  NonSelectedLine,
  SelectedLine,
  Thumb,
  Wrap,
  Popup,
  thumbSide
};
export default Slider;
