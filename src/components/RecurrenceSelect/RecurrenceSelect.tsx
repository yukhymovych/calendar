import React, { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectOption = {
  name: string;
  value: string;
}

interface RecurrenceSelectProps {
  label: string;
  defaultValue: string;
  onChange: (data: any) => void;
  options: SelectOption[];
}

export const RecurrenceSelect: FC<RecurrenceSelectProps> = ({
  label,
  defaultValue,
  onChange,
  options,
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <FormControl sx={{ mt: "30px", minWidth: 200 }} size="small">
      <InputLabel id="select">{label}</InputLabel>
      <Select
        labelId="select"
        id="select"
        value={value}
        label="Color"
        onChange={handleChange}
      >
        <MenuItem value="noRecurrence">
          <em>No recurrence</em>
        </MenuItem>
        {options.map((item: SelectOption) => {
          return <MenuItem value={item.value}>{item.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
