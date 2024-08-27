import { DateInput, DateInputProps } from "@core-ui/react-mantine-core";
import { IStringSchemaProperty } from "@core/json-schema";
import { ControlProps, useFormError } from "@core-ui/react-hooks-form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface DateControlProps
  extends ControlProps<IStringSchemaProperty, DateInputProps> { }

export const DateControl = forwardRef<HTMLInputElement, DateControlProps>(
  (props: DateControlProps, ref) => {
    const { control, formState } = useFormContext();
    const getError = useFormError(formState);
    // TODO: missing css import to use date picker
    return (
      <Controller
        control={control}
        name={props.name!}
        render={({ field }) => (
          <DateInput
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
