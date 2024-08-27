import { Input, Switch, SwitchProps } from "@core-ui/react-mantine-core";
import { IBooleanSchemaProperty } from "@core/json-schema";
import { ControlProps, useFormError } from "@core-ui/react-hooks-form";
import { useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface BooleanControlProps
  extends ControlProps<IBooleanSchemaProperty, Omit<SwitchProps, "value">> {
  value?: boolean;
}

export const BooleanControl = (props: BooleanControlProps) => {
  const { label, withAsterisk, description, value, name, ...other } =
    getControlProps(props, true);

  const { register, formState } = useFormContext();
  const getError = useFormError(formState);

  return (
    <Input.Wrapper
      label={label}
      withAsterisk={withAsterisk}
      error={name && getError(name)}
    >
      <Switch
        checked={value}
        label={description}
        {...other}
        {...register(name!)}
      />
    </Input.Wrapper>
  );
};
