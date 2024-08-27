import { AutoForm, UseFormReturn } from "@core-ui/react-hooks-form";
import { Role, useRoleData } from "@core-ui/react-user-management";

export interface IRoleDtailProps {
  form: UseFormReturn<Role, any, undefined>;
}

export const RoleDetail = ({ form }: IRoleDtailProps) => {
  const { roleSchema, roleData } = useRoleData();

  return (
    <div className="w-full h-full flex flex-col">
      {roleData?.isEdit && <AutoForm<Role> schema={roleSchema} form={form} />}
    </div>
  );
};
