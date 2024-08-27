import { Position, useDrawerContent } from "@core-ui/react-drawer";
import { Drawer } from "@core-ui/react-mantine-core";
import { ReactNode } from "react";
export interface IDrawerContentProps {
  children: ReactNode;
  position: Position;
  className?: string;
}

export const DrawerContent = ({
  children,
  position,
  className,
}: IDrawerContentProps) => {
  const { close, drawerData } = useDrawerContent();

  return (
    <Drawer.Root
      opened={!!drawerData?.opened?.includes(position)}
      onClose={close(position)}
      position={position}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>{drawerData?.title}</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body className={className}>{children}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
