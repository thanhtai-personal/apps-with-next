import { NumberInput, NumberInputProps } from "@core-ui/react-mantine-core";
import { INumberSchemaProperty } from "@core/json-schema";
import { ControlProps, useFormError } from "@core-ui/react-hooks-form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface NumberControlProps
  extends ControlProps<INumberSchemaProperty, NumberInputProps> { }

export const NumberControl = forwardRef<HTMLInputElement, NumberControlProps>(
  (props: NumberControlProps, ref) => {
    const { control, formState } = useFormContext();
    const getError = useFormError(formState);

    return (
      <Controller
        control={control}
        name={props.name!}
        render={({ field }) => (
          <NumberInput
            {...getControlProps(props, true)}
            {...field}
            ref={ref}
            error={props.name && getError(props.name)}
          />
        )}
      />
    );
  },
);
