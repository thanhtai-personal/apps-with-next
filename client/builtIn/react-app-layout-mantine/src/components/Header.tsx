import {
  Burger,
  Group,
  Image,
  useDisclosure,
  Container,
  Menu,
} from "@core-ui/react-mantine-core";
import { LayoutContext } from "../context";
import { useCallback, useEffect, useState } from "react";

export interface IHeaderProps {
  isUnderRoute?: boolean;
  hideMenu?: boolean;
  useAutoFixed?: boolean;
}

export const Header = ({ useAutoFixed = true }: IHeaderProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [activeMenu, setActiveMenu] = useState("");
  const { logo, topMenu, topRightGroup } = LayoutContext.useDataContext() || {};
  const [fixed, { toggle: openFixed }] = useDisclosure(false);
  const items = topMenu?.items?.map((link) => {
    return (
      <div
        key={link.id}
        className={`block text-text-default hover:bg-orange-400 rounded-lg cursor-pointer px-2 py-4 no-underline font-bold hover:text-[#001149] ${link.label === activeMenu && "text-white bg-orange-400"}`}
        onClick={() => {
          setActiveMenu((prev) =>
            prev === link.id.toString() ? "" : link.id.toString(),
          );
          const sectionElement = document.getElementById(
            `section-${link.name}`,
          );
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <div className="relative text-white">
          {link.label}
        </div>
      </div>
    );
  });

  const menuItems = topMenu?.items?.map((link) => {
    return (
      <Menu.Item
        key={link.id}
        className={"block py-4 no-underline font-bold px-8"}
        onClick={() => {
          setActiveMenu((prev) =>
            prev === link.id.toString() ? "" : link.id.toString(),
          );
          const sectionElement = document.getElementById(
            `section-${link.name}`,
          );
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {link.label}
      </Menu.Item>
    );
  });

  const handleScroll = useCallback(() => {
    const pageY = window.scrollY;
    const screenHeight = window.innerHeight;
    if (pageY > screenHeight) {
      if (!fixed) openFixed();
    } else {
      if (fixed === true) {
        openFixed();
      }
    }
  }, [fixed]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fixed]);

  return (
    <header
      className={`w-full shadow-sm h-fit py-4 bg-bg-header ${fixed && useAutoFixed && "fixed top-0 left-0 w-screen z-[100] animate-slide-down"}`}
    >
      <Container fluid className={"w-full h-fit max-w-[1440px]"}>
        <Group justify="space-between">
          {logo && <Image className={"w-24"} src={logo.src} alt={logo.alt} />}
          <Group gap={5} visibleFrom="md">
            {items}
          </Group>
          <div className="flex flex-row justify-end items-center">
            {topRightGroup && topRightGroup}
            <Menu
              opened={opened}
              transitionProps={{ exitDuration: 0 }}
              withinPortal
            >
              <Menu.Target>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="md"
                  className="pl-2 w-6 h-6 lg:w-12 lg:h-12"
                />
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          </div>
        </Group>
      </Container>
    </header>
  );
};
