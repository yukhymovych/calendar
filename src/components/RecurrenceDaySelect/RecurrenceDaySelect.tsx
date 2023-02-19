import React, { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

interface RecurrenceDaySelectProps {
  defaultValue: string[];
  onChange: (data: any) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const RecurrenceDaySelect: FC<RecurrenceDaySelectProps> = ({
  defaultValue = [],
  onChange,
}) => {
  const [value, setValue] = useState<string[]>(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ mt: "30px", minWidth: 200 }} size="small">
      <InputLabel id="days-of-week-select">Days of week</InputLabel>
      <Select
        labelId="days-of-week-select"
        id="days-of-week-select"
        multiple
        value={value as any}
        onChange={handleChange}
        input={<OutlinedInput label="Days of week" />}
        renderValue={(selected: any) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {days.map((day: string) => (
          <MenuItem key={day} value={day}>
            <Checkbox checked={value?.indexOf(day) > -1} />
            <ListItemText primary={day} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
