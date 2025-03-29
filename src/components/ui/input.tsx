import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message, Space } from "antd";
import InputAntd from "antd/es/input/Input";
import InputCheckbox from "components/ui/check-box";
import InputURL from "components/ui/input-url";
import UploadFile from "components/ui/upload-file";
import { cn } from "lib/utils";
import React from "react";

type InputProps = {
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  defaultValue?: string;
  option?: string[];
  itemDropdown?: {
    label: string;
    key: string;
  }[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const InputGroup = ({
  label,
  placeholder,
  className,
  type,
  description,
  disabled,
  defaultValue,
  option,
  itemDropdown,
}: InputProps) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items: itemDropdown,
    onClick: handleMenuClick,
  };

  const renderInput = (type: string) => {
    switch (type) {
      case "file":
        return <UploadFile />;

      case "url":
        return <InputURL defaultValue={defaultValue} />;

      case "checkbox":
        return <InputCheckbox options={option} />;

      case "dropdown":
        return (
          <Dropdown className="w-full !bg-white" menu={menuProps}>
            <Button className="flex justify-between items-center">
              <span>{itemDropdown?.[0].label}</span>
              <DownOutlined />
            </Button>
          </Dropdown>
        );

      default:
        return (
          <InputAntd
            placeholder={placeholder}
            type={type}
            allowClear
            className={cn("px-4 py-2", className)}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        );
    }
  };
  return (
    <div className="flex items-start gap-8">
      {label && (
        <h1 className="min-w-fit max-w-[200px] w-full text-base text-gray-500">
          {label}
        </h1>
      )}
      <div className="w-full">
        <div className="max-w-[400px]">{renderInput(type)}</div>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};
