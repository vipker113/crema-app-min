import { Button, message } from "antd";
import { InputGroup } from "components/ui/input";
import React from "react";

const GeneralSetting = () => {
  const items = [
    {
      label: "Store Manager",
      key: "1",
    },
    {
      label: "Customer",
      key: "2",
    },
    {
      label: "Registered Member",
      key: "3",
    },
    {
      label: "Contributor",
      key: "4",
    },
    {
      label: "Author",
      key: "5",
    },
    {
      label: "Editor",
      key: "6",
    },
    {
      label: "Administrator",
      key: "7",
    },
  ];
  return (
    <div className="text-red-600">
      <h1>General Setting</h1>
      <div className="flex my-10 flex-col gap-8">
        <InputGroup label="Website Title" defaultValue="Crema Website" />
        <InputGroup
          label="Description"
          defaultValue="A new website using WordPress."
          description='In a few words, introduce what this website is about. For example: "A new website using WordPress."'
        />
        <InputGroup
          type="file"
          label="Website icon (favicon)"
          description="A website icon (favicon) is what you see in browser tabs, bookmarks, and WordPress mobile apps. It should be square and at least 512 x 512 pixels."
        />
        <InputGroup
          type="url"
          defaultValue="demos.wponeclick"
          label="Website Address (URL)"
          description="Enter the same address here unless you want your website's homepage to be different from the WordPress installation directory."
        />
        <InputGroup
          defaultValue="warranty@wponeclick.com"
          label="Admin Email Address"
          description="Enter the same address here unless you want your website's homepage to be different from the WordPress installation directory."
        />
        <InputGroup
          label="Membership"
          type="checkbox"
          option={["Anyone can register"]}
        />
        <InputGroup
          label="Role New Membership"
          type="dropdown"
          itemDropdown={items}
        />
        <Button
          onClick={() => message.success("Save successfully")}
          type="primary"
          className="mt-6 w-fit px-10"
        >
          Save Change
        </Button>
      </div>
    </div>
  );
};

export default GeneralSetting;
