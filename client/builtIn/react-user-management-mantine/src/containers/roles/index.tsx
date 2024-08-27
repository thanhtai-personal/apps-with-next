import { RolesContext } from "@core-ui/react-user-management";
import { RoleComponent } from "../../components";
import { RouteLayout } from "@core-ui/react-layout-mantine";

const RolesContainer = () => {
  return (
    <RouteLayout classes={{ body: "w-full flex flex-row justify-start items-start p-2  rounded-sm" }}>
      <RolesContext.Provider>
        <RoleComponent />
      </RolesContext.Provider>
    </RouteLayout>
  );
};

export default RolesContainer;
