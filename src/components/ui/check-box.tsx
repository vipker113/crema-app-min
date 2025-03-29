import React from "react";
import { Checkbox } from "antd";

type Props = {
  label?: string;
  description?: string;
  defaultValue?: string[];
  options: string[];
  onChange?: (checkedValues: string[]) => void;
};

const InputCheckbox = ({
  defaultValue,
  options,
  onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  },
}: Props) => (
  <Checkbox.Group
    className="w-full"
    onChange={onChange}
    defaultValue={defaultValue}
    options={options}
  />
);

export default InputCheckbox;
