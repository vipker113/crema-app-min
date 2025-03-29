import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="http://">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

type Props = {
  defaultValue?: string;
};

const InputURL = ({ defaultValue = "mysite" }: Props) => {
  return (
    <Input
      addonBefore={selectBefore}
      addonAfter={selectAfter}
      defaultValue={defaultValue}
      className="w-full"
    />
  );
};

export default InputURL;
