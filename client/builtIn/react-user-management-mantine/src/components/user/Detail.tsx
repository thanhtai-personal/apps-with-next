import { AutoForm, UseFormReturn } from "@core-ui/react-hooks-form";
import { User, useUserData } from "@core-ui/react-user-management";

export interface IUserDtailProps {
  form: UseFormReturn<User, any, undefined>;
}

export const UserDetail = ({ form }: IUserDtailProps) => {
  const { userSchema, userData } = useUserData();
  return (
    <div className="w-full h-full flex flex-col">
      {userData?.isEdit && <AutoForm<User> schema={userSchema} form={form} />}
    </div>
  );
};
