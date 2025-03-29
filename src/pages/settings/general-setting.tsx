import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const GeneralSetting = asyncComponent(
  () => import("../../modules/settings/GeneralSetting")
);
export default AppPage(() => <GeneralSetting />);
