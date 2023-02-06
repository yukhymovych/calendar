import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";

interface DateTimePickerInputInterface {
  name: string;
  control: any;
  label: string;
  isRequired?: boolean;
  [x: string]: any;
}

export const DateTimePickerInput: FC<DateTimePickerInputInterface> = ({
  name,
  control,
  label,
  isRequired = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value } }) => (
        <DateTimePicker
          {...props}
          renderInput={(innerProps) => <TextField {...innerProps} />}
          label={label}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
