import React, { FC, useState } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { colorOptions } from './colors';

import './SelectColor.css';

interface SelectColorProps {
  defaultValue: string;
  onChange: (data: SelectChangeEvent) => void;
}

export const SelectColor: FC<SelectColorProps> = ({
  defaultValue,
  onChange,
}) => {
  const [color, setColor] = useState<string>(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value);
    onChange(event);
  };

  return (
    <FormControl sx={{ mt: '30px', minWidth: 200 }} size="small">
      <InputLabel id="select-color">Color</InputLabel>
      <Select
        labelId="select-color"
        id="select-color"
        value={color}
        label="Color"
        onChange={handleChange}
      >
        <MenuItem value="none">
          <em>None</em>
        </MenuItem>
        {colorOptions.map((item) => {
          return (
            <MenuItem value={item.value} key={item.value}>
              <div className="color-selector-item">
                <div
                  className="color-box"
                  style={{
                    backgroundColor: item.value,
                  }}
                ></div>
                {item.name}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
