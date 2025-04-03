import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const DashBoard = asyncComponent(() => import("../../modules/dashboard"));
export default AppPage(() => <DashBoard />);
