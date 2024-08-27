import { ControlProps } from "@core-ui/react-hooks-form";
import { ISchemaProperty } from "@core/json-schema";

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(
  props: Props,
  input: true,
): Props & {
  label: string | undefined;
  description: string | undefined;
  withAsterisk: boolean;
};

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(
  props: Props,
): Props & {
  label: string | undefined;
  description: string | undefined;
};

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(props: Props, input?: boolean) {
  const {
    schema,
    required = false,
    ...other
  } = props;

  const { title, description, ...nestedProps } = schema;

  if (!input) {
    return {
      label: title,
      description,
      ...other,
    };
  }

  return {
    label: title,
    description,
    withAsterisk: required,
    ...other,
    ...nestedProps,
  };
}
