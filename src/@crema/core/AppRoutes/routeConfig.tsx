import React from "react";
import {
  BellDot,
  CircleGauge,
  Settings,
  SlidersHorizontal,
  User,
} from "lucide-react";

const routesConfig = [
  {
    id: "dashboard",
    title: "DashBoard",
    messageId: "sidebar.dashboard",
    path: "/dashboard",
    icon: <CircleGauge size={20} />,
    type: "collapse",
  },
  {
    id: "users",
    title: "User",
    messageId: "sidebar.user",
    path: "/users",
    icon: <User size={20} />,
    type: "collapse",
  },
  {
    id: "setting",
    title: "Settings",
    messageId: "sidebar.settings",
    icon: <Settings size={20} />,
    type: "group",
    children: [
      {
        id: "general-setting",
        title: "General Setting",
        messageId: "sidebar.settings.generalSetting",
        type: "item",
        icon: <SlidersHorizontal size={20} />,
        path: "/settings/general-setting",
      },
      {
        id: "notification-setting",
        title: "Notification Setting",
        messageId: "sidebar.settings.notificationSetting",
        type: "item",
        icon: <BellDot size={20} />,
        path: "/settings/notification-setting",
      },
    ],
  },
];
export default routesConfig;
