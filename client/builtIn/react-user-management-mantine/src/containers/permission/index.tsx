import { PermissionsContext } from "@core-ui/react-user-management";
import { PermissionComponent } from "../../components";
import { RouteLayout } from "@core-ui/react-layout-mantine";

const PermissionsContainer = () => {
  return (
    <RouteLayout classes={{ body: "w-full flex flex-row justify-start items-start p-2  rounded-sm" }}>
      <PermissionsContext.Provider>
        <PermissionComponent />
      </PermissionsContext.Provider>
    </RouteLayout>
  );
};

export default PermissionsContainer;
