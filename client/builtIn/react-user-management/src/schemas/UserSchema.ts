import { CheckboxProps } from "@core-ui/react-mantine-core";
import { ArrayValueFormat, IArrayValueSchemaProperty, IObjectSchemaProperty, IStringSchemaProperty, JsonSchemaType, StringFormat } from "@core/json-schema"

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  roles: string[];
}

export const makeUserSchema: ({
  roleList,
  initialValues,
}: {
  roleList?: CheckboxProps[];
  initialValues?: Partial<User>;
}) => IObjectSchemaProperty = ({ roleList = [], initialValues = {} as Partial<User> }) => {
  return {
    type: JsonSchemaType.Object,
    properties: {
      firstName: {
        type: JsonSchemaType.String,
        minLength: 2,
        maxLength: 50,
        title: "First name",
        placeholder: "Ex: Tran",
        defaultValue: initialValues?.firstName,
      } as IStringSchemaProperty,
      lastName: {
        type: JsonSchemaType.String,
        minLength: 2,
        maxLength: 50,
        title: "Last name",
        placeholder: "Ex: Tai",
        defaultValue: initialValues?.lastName,
      } as IStringSchemaProperty,
      email: {
        type: JsonSchemaType.String,
        minLength: 15,
        maxLength: 50,
        title: "Email",
        format: StringFormat.Email,
        placeholder: "Ex: tai.tran",
        defaultValue: initialValues?.email,
      } as IStringSchemaProperty,
      password: {
        type: JsonSchemaType.String,
        minLength: 8,
        maxLength: 50,
        title: "Password",
        placeholder: "Ex: Abcd@1234",
        useAutoGenerate: true,
        format: StringFormat.Password,
        defaultValue: initialValues?.password,
      } as IStringSchemaProperty,
      roles: {
        type: JsonSchemaType.ArrayValue,
        title: "Role list",
        format: ArrayValueFormat.Checkbox,
        items: roleList,
        defaultValue: initialValues?.roles,
      } as IArrayValueSchemaProperty,
    },
    required: ["firstName", "lastName", "email", "password", "role"],
  }
}