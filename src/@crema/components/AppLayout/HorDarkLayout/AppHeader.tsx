import React from "react";
import { Dropdown } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { useIntl } from "react-intl";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import AppHeaderMessages from "../../AppHeaderMessages";
import AppNotifications from "../../AppNotifications";
import NotificationBar from "./NotificationBar";
import { AiOutlineMenu } from "react-icons/ai";
import AppLogo from "../components/AppLogo";
import UserInfo from "../components/UserInfo";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import {
  StyledAppHeaderHorDark,
  StyledAppMainHorDarkMainMenu,
  StyledContainer,
  StyledHeaderHorDarkMain,
  StyledHeaderHorDarkSecDesktop,
  StyledHeaderHorDarkSecMobile,
  StyledHeaderNavHorDark,
  StyledHeaderSearchHorDark,
  StyledHorDarkMainFlex,
} from "./index.styled";
import { StyledDropdownWrapper } from "../index.styled";

const items = [
  { key: 1, label: <AppHeaderMessages /> },
  { key: 2, label: <AppNotifications /> },
  { key: 3, label: <AppLanguageSwitcher /> },
];

type AppHeaderProps = {
  showDrawer: () => void;
};

const AppHeader = ({ showDrawer }: AppHeaderProps) => {
  const { messages } = useIntl();
  const { sidebarColorSet } = useSidebarContext();

  return (
    <StyledAppHeaderHorDark
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}
    >
      <NotificationBar />

      <StyledHeaderHorDarkMain
        style={{
          backgroundColor: sidebarColorSet.sidebarBgColor,
          color: sidebarColorSet.sidebarTextColor,
        }}
      >
        <StyledContainer>
          <StyledHorDarkMainFlex>
            <a className="trigger" onClick={showDrawer}>
              <AiOutlineMenu />
            </a>
            <AppLogo hasSidebarColor />
            <StyledHeaderSearchHorDark
              placeholder={messages["common.searchHere"] as string}
            />

            <StyledHeaderHorDarkSecDesktop>
              <AppLanguageSwitcher />
              <AppHeaderMessages />
              <AppNotifications />
            </StyledHeaderHorDarkSecDesktop>
            <UserInfo />
            <StyledHeaderHorDarkSecMobile>
              <StyledDropdownWrapper>
                <Dropdown
                  menu={{ items }}
                  overlayClassName="dropdown-wrapper"
                  getPopupContainer={(triggerNode) => triggerNode}
                  trigger={["click"]}
                >
                  <a
                    className="ant-dropdown-link-mobile"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FiMoreVertical />
                  </a>
                </Dropdown>
              </StyledDropdownWrapper>
            </StyledHeaderHorDarkSecMobile>
          </StyledHorDarkMainFlex>
        </StyledContainer>
      </StyledHeaderHorDarkMain>

      <StyledHeaderNavHorDark
        style={{
          backgroundColor: sidebarColorSet.sidebarBgColor,
          color: sidebarColorSet.sidebarTextColor,
        }}
      >
        <StyledContainer>
          <StyledAppMainHorDarkMainMenu />
        </StyledContainer>
      </StyledHeaderNavHorDark>
    </StyledAppHeaderHorDark>
  );
};

export default AppHeader;
