import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

interface TextInputInterface {
  name: string;
  control: any;
  label: string;
  isRequired?: boolean;
  [x: string]: any;
}

export const TextInput: FC<TextInputInterface> = ({
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
        <TextField
          {...props}
          onChange={onChange}
          value={value}
          label={label}
          required={isRequired}
        />
      )}
    />
  );
};
