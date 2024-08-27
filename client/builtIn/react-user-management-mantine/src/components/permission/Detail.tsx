import { AutoForm, UseFormReturn } from "@core-ui/react-hooks-form";
import { Permission, usePermissionData } from "@core-ui/react-user-management";

export interface IPermissionDtailProps {
  form: UseFormReturn<Permission, any, undefined>;
}

export const PermissionDetail = ({ form }: IPermissionDtailProps) => {
  const { permissionSchema, permissionData } = usePermissionData();

  if (permissionData?.isEdit) {
    return <AutoForm<Permission> schema={permissionSchema} form={form} />;
  }
  return (
    <div className="w-full h-full flex flex-col">
      {permissionData?.isEdit && (
        <AutoForm<Permission> schema={permissionSchema} form={form} />
      )}
    </div>
  );
};
