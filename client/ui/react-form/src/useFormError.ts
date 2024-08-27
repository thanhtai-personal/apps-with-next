import { ReactNode } from "react";
import { FieldPath, FieldValues, FormState, get } from "react-hook-form";

export const useFormError = <TFieldValues extends FieldValues = FieldValues>(
  formState: FormState<TFieldValues>,
) => {
  const errors = formState.errors;
  return <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    name: TFieldName,
  ): ReactNode => {
    return get(errors, `${name}.message`) as ReactNode;
  };
};
