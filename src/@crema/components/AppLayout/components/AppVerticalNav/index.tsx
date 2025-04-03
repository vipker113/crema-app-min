import React, { useEffect, useState } from "react";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import { useRouter } from "next/router";
import { RouterConfigData } from "@crema/types/models/Apps";
import { Menu } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { cn } from "lib/utils";

const { SubMenu } = Menu;

type Props = {
  routesConfig: RouterConfigData[];
};

const LOCAL_STORAGE_KEY = "openSubMenuKeys";

const AppVerticalNav: React.FC<Props> = ({ routesConfig }) => {
  const { sidebarColorSet } = useSidebarContext();
  const router = useRouter();
  const { pathname } = router;
  const selectedKeys = pathname.split("/").filter(Boolean);
  const activeKey = selectedKeys[selectedKeys.length - 1] || selectedKeys[0];

  const [openKeys, setOpenKeys] = useState<string[]>(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") || []
  );

  useEffect(() => {
    const parentKey = selectedKeys[selectedKeys.length - 2];
    if (parentKey && !openKeys.includes(parentKey)) {
      setOpenKeys((prevKeys) => [...prevKeys, parentKey]);
    }
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(openKeys));
  }, [openKeys]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const handleMenuItemClick = (path: string) => {
    if (path) {
      router.push(path);
    }
  };

  const renderMenuItems = (routes: RouterConfigData[]) => {
    return routes.map((route) => {
      if (route.type === "group" && route.children) {
        return (
          <SubMenu
            key={route.id}
            icon={route.icon}
            title={<span>{route.title}</span>}
          >
            {renderMenuItems(route.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={route.id}
            icon={route.icon}
            onClick={() => handleMenuItemClick(route.path)}
            className={cn(
              "px-4 py-2 rounded-md transition-all duration-300",
              activeKey === route.id
                ? "!bg-gray-500 !text-white"
                : "!hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <span>{route.title}</span>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu
      theme={sidebarColorSet.mode as SiderTheme}
      mode="inline"
      onOpenChange={onOpenChange}
      selectedKeys={[activeKey]}
      openKeys={openKeys}
    >
      {renderMenuItems(routesConfig)}
    </Menu>
  );
};

export default AppVerticalNav;
