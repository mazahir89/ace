import React from 'react';
import * as styled from './Range.styled';

export interface Props {
  onChange?: (value: number) => void;
  value: number;
  min: number;
  max: number;
}
export default function Range({
  value, onChange, min, max
}: Props) {
  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;
    const parsedValue = parseInt(eventValue, 10);
    if (!parsedValue) {
      onChange(value);
    } else if (parsedValue < min) {
      onChange(min);
    } else if (parsedValue > max) {
      onChange(max);
    } else {
      onChange(parsedValue);
    }
  }
  const sliderPercentage: number = Math.round(
    ((value - min) / (max - min)) * 100
  );
  return (
    <styled.Wrap>
      <styled.SliderParts>
        <styled.SliderFill width={sliderPercentage} />
        <styled.SliderTrack />
        <styled.Amount position={sliderPercentage}>
          <div>
            <span>{value}</span>

            <span>€</span>
          </div>
        </styled.Amount>
      </styled.SliderParts>
      <styled.RangeInput
        type="range"
        step="100"
        min={min}
        max={max}
        value={value}
        onChange={(e: any) => handleOnChange(e)}
      />
    </styled.Wrap>
  );
}

export { styled };
