import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const NotificationSetting = asyncComponent(
  () => import("../../modules/settings/NotificationSetting")
);
export default AppPage(() => <NotificationSetting />);
