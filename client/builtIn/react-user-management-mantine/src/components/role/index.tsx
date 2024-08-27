import { Button, IconPlus } from "@core-ui/react-mantine-core";
import { MantineTable } from "@core-ui/react-table-mantine";
import { DrawerContent } from "@core-ui/react-drawer-mantine";
import { useMemo } from "react";
import {
  roleColumns,
  useRoleData,
  useRolesData,
} from "@core-ui/react-user-management";
import { RoleResponse } from "@core-sdk/user-management";
import { IRecord } from "@core-ui/react-table";
import { RoleDetail } from "./Detail";

type RoleDataResponse = RoleResponse & IRecord;

export interface IRoleComponent { }

export const RoleComponent = ({ }: IRoleComponent) => {
  const { form, onCreateRole, onUpdateRole, setDetailData, setEditMode } = useRoleData();
  const { onFilter, roleData, drawer, loading } = useRolesData(<div>Role</div>);

  const columns = useMemo(() => {
    return roleColumns.map((column) => ({
      ...column,
      render: (record) => {
        switch (column.name) {
          case "permissions":
            return (
              <div className="p-1 uppercase font-bold">
                {(roleData?.permissions || [])
                  .filter((item) => record.permissions?.includes(item.id))
                  .reduce(
                    (prev, item) => `${prev ? `${prev},` : ""} ${item.name}`,
                    "",
                  )}
              </div>
            );
          default:
            return <div className="p-1">{record[column.name]}</div>;
        }
      },
    }));
  }, [roleData?.permissions]);

  return (
    <div className="flex flex-col w-full">
      <div className=" font-bold text-lg my-2">Role</div>
      <div className="flex flex-row w-full justify-between my-2">
        <div>
          <Button onClick={drawer.open}>
            <div className="flex flex-row flex-nowrap text-white justify-center items-center">
              <IconPlus />
              <div className="text-white ml-2">Create</div>
            </div>
          </Button>
        </div>
        <div>{/* <Pagination total={100} /> */}</div>
      </div>
      <div></div>
      <MantineTable<RoleDataResponse>
        loading={loading}
        records={(roleData?.roles || []) as unknown as RoleDataResponse[]}
        onFilter={onFilter}
        columns={columns}
        sort={{
          defaultSortField: "name",
          columnNames: ["name"],
        }}
        classes={{
          body: "bg-slate-100",
          container: "bg-white rounded-lg shadow-sm p-2",
        }}
        total={roleData?.total || 0}
        onRowClick={(record?: RoleDataResponse) => () => {
          if (!record) return;
          setDetailData(record);
          setEditMode(false);
          drawer.openDetail(`Role ${record?.id}`);
        }}
      />
      <DrawerContent position="right" className="w-full h-[calc(100%-60px)]">
        <div className="w-full h-full flex flex-col relative pb-[80px]">
          <RoleDetail form={form} />
          <div className="absolute h-[70px] bottom-0 left-0 w-full border-solid border-t-2 border-slate-200">
            <div className="w-full h-full flex flex-row justify-between items-center">
              <div>
                <Button
                  onClick={
                    roleData?.isEdit ? () => setEditMode(false) : drawer.close
                  }
                  variant="default"
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  onClick={
                    roleData?.role?.id
                      ? roleData.isEdit
                        ? form.handleSubmit(onUpdateRole)
                        : () => setEditMode(true)
                      : form.handleSubmit(onCreateRole)
                  }
                  variant="filled"
                >
                  {roleData?.role?.id
                    ? roleData.isEdit
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
