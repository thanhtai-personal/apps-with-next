import { Button, IconPlus } from "@core-ui/react-mantine-core";
import { MantineTable } from "@core-ui/react-table-mantine";
import { DrawerContent } from "@core-ui/react-drawer-mantine";
import { useMemo } from "react";
import { StatusComponent } from "../StatusComponent";
import {
  useUserData,
  useUsersData,
  userColumns,
} from "@core-ui/react-user-management";
import { UserResponse } from "@core-sdk/user-management";
import { IRecord } from "@core-ui/react-table";
import { UserDetail } from "./Detail";

type UserDataResponse = UserResponse & IRecord;

export interface IUserComponent { }

export const UserComponent = ({ }: IUserComponent) => {
  const { form, onCreateUser, onUpdateUser, setDetailData, setEditMode } =
    useUserData();
  const { onFilter, userData, drawer, loading } = useUsersData(<div>User</div>);
  const columns = useMemo(() => {
    return userColumns.map((column) => ({
      ...column,
      render: (record) => {
        switch (column.name) {
          case "role":
            return (
              <div className="p-1 uppercase font-bold">
                {(userData?.roles || [])
                  .filter((item) => record.roles?.includes(item.id))
                  .reduce(
                    (prev, item) => `${prev ? `${prev},` : ""} ${item.name}`,
                    "",
                  )}
              </div>
            );
          case "status":
            return (
              <div className="p-1">
                <StatusComponent className={"w-full"} value={record.status} />
              </div>
            );
          default:
            return <div className="p-1">{record[column.name]}</div>;
        }
      },
    }));
  }, [userData?.roles]);

  return (
    <div className="flex flex-col w-full">
      <div className=" font-bold text-lg my-2">User</div>
      <div className="flex flex-row w-full justify-between my-2">
        <div>
          <Button onClick={drawer.open}>
            <div className="flex flex-row flex-nowrap text-white justify-center items-center">
              <IconPlus />
              <div className="text-white ml-2">Create</div>
            </div>
          </Button>
        </div>
      </div>
      <div></div>
      <MantineTable<UserDataResponse>
        loading={loading}
        records={(userData?.users || []) as unknown as UserDataResponse[]}
        onFilter={onFilter}
        columns={columns}
        sort={{
          defaultSortField: "firstName",
          columnNames: ["firstName", "lastName", "email", "status"],
        }}
        classes={{
          body: "bg-slate-100",
          container: "bg-white rounded-lg shadow-sm p-2",
        }}
        total={userData?.total || 0}
        onRowClick={(record?: UserDataResponse) => () => {
          if (!record) return;
          setDetailData(record);
          setEditMode(false);
          drawer.openDetail(`User ${record?.id}`);
        }}
      />
      <DrawerContent position="right" className="w-full h-[calc(100%-60px)]">
        <div className="w-full h-full flex flex-col relative pb-[80px]">
          <UserDetail form={form} />
          <div className="absolute h-[70px] bottom-0 left-0 w-full border-solid border-t-2 border-slate-200">
            <div className="w-full h-full flex flex-row justify-between items-center">
              <div>
                <Button
                  onClick={
                    userData?.isEdit ? () => setEditMode(false) : drawer.close
                  }
                  variant="default"
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  onClick={
                    userData?.user?.id
                      ? userData.isEdit
                        ? form.handleSubmit(onUpdateUser)
                        : () => setEditMode(true)
                      : form.handleSubmit(onCreateUser)
                  }
                  variant="filled"
                >
                  {userData?.user?.id
                    ? userData.isEdit
                      ? "Save"
                      : "Edit"
                    : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </div>
  );
};
