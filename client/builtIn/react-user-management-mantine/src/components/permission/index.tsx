import { Button, IconPlus } from "@core-ui/react-mantine-core";
import { MantineTable } from "@core-ui/react-table-mantine";
import { DrawerContent } from "@core-ui/react-drawer-mantine";
import { useMemo } from "react";
import {
  permissionColumns,
  usePermissionData,
  usePermissionsData,
} from "@core-ui/react-user-management";
import { PermissionResponse } from "@core-sdk/user-management";
import { IRecord } from "@core-ui/react-table";
import { PermissionDetail } from "./Detail";

type PermissionDataResponse = PermissionResponse & IRecord;

export interface IPermissionComponent { }

export const PermissionComponent = ({ }: IPermissionComponent) => {
  const {
    form,
    onCreatePermission,
    onUpdatePermission,
    setDetailData,
    setEditMode,
  } = usePermissionData();
  const { onFilter, permissionData, drawer, loading } = usePermissionsData(
    <div>Permission</div>,
  );

  const columns = useMemo(() => {
    return permissionColumns.map((column) => ({
      ...column,
      render: (record) => {
        switch (column.name) {
          default:
            return <div className="p-1">{record[column.name]}</div>;
        }
      },
    }));
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className=" font-bold text-lg my-2">Permission</div>
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
      <MantineTable<PermissionDataResponse>
        loading={loading}
        records={
          (permissionData?.permissions ||
            []) as unknown as PermissionDataResponse[]
        }
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
        total={permissionData?.total || 0}
        onRowClick={(record?: PermissionDataResponse) => () => {
          if (!record) return;
          setDetailData(record);
          setEditMode(false);
          drawer.openDetail(`Permission ${record?.id}`);
        }}
      />
      <DrawerContent position="right" className="w-full h-[calc(100%-60px)]">
        <div className="w-full h-full flex flex-col relative pb-[80px]">
          <PermissionDetail form={form} />
          <div className="absolute h-[70px] bottom-0 left-0 w-full border-solid border-t-2 border-slate-200">
            <div className="w-full h-full flex flex-row justify-between items-center">
              <div>
                <Button
                  onClick={
                    permissionData?.isEdit ? () => setEditMode(false) : drawer.close
                  }
                  variant="default"
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  onClick={
                    permissionData?.permission?.id
                      ? permissionData.isEdit
                        ? form.handleSubmit(onUpdatePermission)
                        : () => setEditMode(true)
                      : form.handleSubmit(onCreatePermission)
                  }
                  variant="filled"
                >
                  {permissionData?.permission?.id
                    ? permissionData.isEdit
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