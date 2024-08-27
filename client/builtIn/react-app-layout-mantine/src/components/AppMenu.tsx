import { Menu } from "@core-ui/react-mantine-core";
import { LayoutContext, IMenuItem, MenuItemType } from "../context";
import { ReactNode, useCallback } from "react";
import { Link } from "@core-ui/react-core";

export interface IAppMenuProps {
  isUnderRoute?: boolean;
}

export const AppMenu = ({ isUnderRoute }: IAppMenuProps) => {
  const pathname = window.location.pathname;
  const { appMenu } = LayoutContext.useDataContext() || {};
  const { items } = appMenu || {};

  const renderItem = useCallback(
    (item: IMenuItem) => {
      let renderLinkItem = (children: ReactNode) => (
        <a href={item.path}>{children}</a>
      );
      switch (item.type) {
        case MenuItemType.DIVIDER:
          return <Menu.Divider className={`${item.classes?.menuItem} my-4`} />;
        case MenuItemType.LABEL:
          return (
            <>
              <Menu.Item
                key={`menu-item-${item.id}`}
                className={`flex pointer-events-none lg:hidden bg-transparent ${item.classes?.menuItem}`}
              >
                <div className={`flex lg:!hidden ${item.classes?.icon}`}>
                  {item.icon}
                </div>
              </Menu.Item>
              <Menu.Label
                key={`menu-label-${item.id}`}
                className={`hidden pointer-events-none lg:flex bg-transparent ${item.classes?.menuItem}`}
              >
                {item.label}
              </Menu.Label>
            </>
          );
        default:
          if (isUnderRoute) {
            renderLinkItem = (children: ReactNode) => (
              <Link to={item.path || ""}>{children}</Link>
            );
          }
          return renderLinkItem(
            <Menu.Item
              key={`menu-item-${item.id}`}
              className={`${item.classes?.menuItem} ${pathname === item.path
                  ? item.classes?.activeItem || "bg-item-active"
                  : item.classes?.inActiveItem || "bg-white"
                }`}
              leftSection={
                <div className={`flex lg:hidden ${item.classes?.icon}`}>
                  {item.icon}
                </div>
              }
            >
              <a
                className={`hidden lg:flex w-full h-full items-center justify-start text-start bg-transparent`}
              >
                {item.name}
              </a>
            </Menu.Item>,
          );
      }
    },
    [pathname],
  );

  return (
    <div className="w-fit lg:min-w-60 h-[calc(100vh-90px)] overflow-auto bg-white dark:bg-black">
      <Menu shadow="md">
        {(items || []).map((item: IMenuItem) => renderItem(item))}
      </Menu>
    </div>
  );
};
