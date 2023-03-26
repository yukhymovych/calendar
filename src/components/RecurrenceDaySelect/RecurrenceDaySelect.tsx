import React, { FC, useEffect, useState } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

interface RecurrenceDaySelectProps {
  defaultValue: string[];
  onChange: (data: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const RecurrenceDaySelect: FC<RecurrenceDaySelectProps> = ({
  defaultValue = [],
  onChange,
}) => {
  const [value, setValue] = useState<string[]>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === 'string' ? value.split(',') : value);
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ mt: '30px', minWidth: 200 }} size="small">
      <InputLabel id="days-of-week-select">Days of week</InputLabel>
      <Select
        labelId="days-of-week-select"
        id="days-of-week-select"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Days of week" />}
        renderValue={(selected: string[]) => selected.join(', ')}
        MenuProps={MENU_PROPS}
      >
        {DAYS.map((day: string) => (
          <MenuItem key={day} value={day}>
            <Checkbox checked={value?.indexOf(day) > -1} />
            <ListItemText primary={day} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
