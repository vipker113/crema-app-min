import React from "react";
import { BiAlignLeft } from "react-icons/bi";

const routesConfig = [
  {
    id: "app",
    title: "Sample",
    messageId: "sidebar.sample",
    type: "group",
    children: [
      {
        id: "page-1",
        title: "Page 1",
        messageId: "sidebar.sample.page1",
        type: "item",
        icon: <BiAlignLeft />,
        path: "/sample/page-1",
      },
      {
        id: "page-2",
        title: "Page 2",
        messageId: "sidebar.sample.page2",
        type: "item",
        icon: <BiAlignLeft />,
        path: "/sample/page-2",
      },
    ],
  },
  {
    id: "setting",
    title: "Settings",
    messageId: "sidebar.settings",
    type: "group",
    children: [
      {
        id: "general-setting",
        title: "General Setting",
        messageId: "sidebar.settings.generalSetting",
        type: "item",
        icon: <BiAlignLeft />,
        path: "/settings/general-setting",
      },
      {
        id: "notification-setting",
        title: "Notification Setting",
        messageId: "sidebar.settings.notificationSetting",
        type: "item",
        icon: <BiAlignLeft />,
        path: "/settings/notification-setting",
      },
    ],
  },
];
export default routesConfig;
