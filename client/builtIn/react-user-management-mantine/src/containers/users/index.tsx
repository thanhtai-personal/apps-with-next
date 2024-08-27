import { UsersContext } from "@core-ui/react-user-management";
import { UserComponent } from "../../components";
import { RouteLayout } from "@core-ui/react-layout-mantine";

const UsersContainer = () => {
  return (
    <RouteLayout classes={{ body: "w-full flex flex-row justify-start items-start p-2  rounded-sm" }}>
      <UsersContext.Provider>
        <UserComponent />
      </UsersContext.Provider>
    </RouteLayout>
  );
};

export default UsersContainer;
