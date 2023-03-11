import React, { FC, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectOption = {
  name: string;
  value: string;
};

interface RecurrenceSelectProps {
  defaultValue: string;
  onChange: (data: SelectChangeEvent) => void;
}

const recurrenceOptions = [
  {
    name: 'Daily',
    value: 'daily',
  },
  {
    name: 'Weekly',
    value: 'weekly',
  },
  {
    name: 'Monthly',
    value: 'monthly',
  },
  {
    name: 'Yearly',
    value: 'yearly',
  },
  {
    name: 'Сertain days',
    value: 'certainDays',
  },
];

export const RecurrenceSelect: FC<RecurrenceSelectProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <FormControl sx={{ mt: '30px', minWidth: 200 }} size="small">
      <InputLabel id="recurrence-select">Recurrence</InputLabel>
      <Select
        labelId="recurrence-select"
        id="recurrence-select"
        value={value}
        label="Recurrence"
        onChange={handleChange}
      >
        <MenuItem value="noRecurrence">
          <em>No recurrence</em>
        </MenuItem>
        {recurrenceOptions.map((item: SelectOption) => {
          return (
            <MenuItem value={item.value} key={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
