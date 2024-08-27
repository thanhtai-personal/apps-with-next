import { CheckboxProps } from "@core-ui/react-mantine-core";
import { ArrayValueFormat, IArrayValueSchemaProperty, IObjectSchemaProperty, IStringSchemaProperty, JsonSchemaType } from "@core/json-schema"

export interface Role {
  name: string;
  description?: string;
  permissions: string[];
}

export const makeRoleSchema: ({
  permissionList,
  initialValues,
}: {
  permissionList?: CheckboxProps[];
  initialValues?: Partial<Role>;
}) => IObjectSchemaProperty = ({ permissionList = [], initialValues = {} as Partial<Role> }) => {
  return {
    type: JsonSchemaType.Object,
    properties: {
      name: {
        type: JsonSchemaType.String,
        minLength: 2,
        maxLength: 50,
        title: "Name",
        placeholder: "Ex: Admin",
        defaultValue: initialValues?.name,
      } as IStringSchemaProperty,
      description: {
        type: JsonSchemaType.String,
        title: "Description",
        placeholder: "Ex: Admin have all role",
        defaultValue: initialValues?.description,
      } as IStringSchemaProperty,
      permissions: {
        type: JsonSchemaType.ArrayValue,
        title: "Permission list",
        format: ArrayValueFormat.Checkbox,
        items: permissionList,
        defaultValue: initialValues?.permissions,
      } as IArrayValueSchemaProperty,
    },
    required: ["name", "permissions"],
  }
}