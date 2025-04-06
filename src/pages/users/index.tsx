import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const User = asyncComponent(() => import("../../modules/users"));
export default AppPage(() => <User />);
