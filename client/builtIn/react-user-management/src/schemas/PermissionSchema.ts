import { CheckboxProps } from "@core-ui/react-mantine-core";
import { IObjectSchemaProperty, IStringSchemaProperty, JsonSchemaType } from "@core/json-schema"

export interface Permission {
  name: string;
  description: string;
}

export const makePermissionSchema: ({
  roleList,
  initialValues,
}: {
  roleList?: CheckboxProps[];
  initialValues?: Partial<Permission>;
}) => IObjectSchemaProperty = ({ initialValues = {} as Partial<Permission> }) => {
  return {
    type: JsonSchemaType.Object,
    properties: {
      name: {
        type: JsonSchemaType.String,
        minLength: 2,
        maxLength: 50,
        title: "Name",
        placeholder: "EDIT",
        defaultValue: initialValues?.name,
      } as IStringSchemaProperty,
      description: {
        type: JsonSchemaType.String,
        title: "Description",
        placeholder: "Ex. Can edit somethings",
        defaultValue: initialValues?.description,
      } as IStringSchemaProperty,
    },
    required: ["name", "description"],
  }
}