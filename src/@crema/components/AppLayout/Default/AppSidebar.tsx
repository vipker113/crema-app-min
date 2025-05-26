import React from "react";
import AppVerticalMenu from "../components/AppVerticalNav";
import {
  StyledAppMainSidebar,
  StyledAppSidebarScrollbar,
} from "./index.styled";
import { RouterConfigData } from "@crema/types/models/Apps";

type AppSidebarProps = {
  routesConfig: RouterConfigData[];
  isCollapsed: boolean;
};

const AppSidebar: React.FC<AppSidebarProps> = ({
  isCollapsed,
  routesConfig,
}) => {
  return (
    <StyledAppMainSidebar collapsible breakpoint="lg" collapsed={isCollapsed}>
      {/* <UserInfo hasColor /> */}
      <StyledAppSidebarScrollbar scrollToTop={true}>
        <AppVerticalMenu routesConfig={routesConfig} />
      </StyledAppSidebarScrollbar>
    </StyledAppMainSidebar>
  );
};

export default AppSidebar;
