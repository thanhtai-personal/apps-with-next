import {
  Checkbox,
  CheckboxProps,
  Flex,
  Text,
} from "@core-ui/react-mantine-core";
import { ControlProps, useFormContext } from "@core-ui/react-hooks-form";
import { IArrayValueSchemaProperty } from "@core/json-schema";
import { ReactNode, forwardRef, useEffect, useState } from "react";

export interface MultipleCheckListControlProps
  extends ControlProps<IArrayValueSchemaProperty, CheckboxProps> { }

export const MultipleCheckListControl = forwardRef<
  HTMLDivElement,
  MultipleCheckListControlProps
>((props: MultipleCheckListControlProps, ref): ReactNode => {
  const { setValue } = useFormContext();
  const [values, setValues] = useState<string[]>([]);

  const {
    schema: { items, title, description, classes, defaultValue },
    name,
  } = props;

  useEffect(() => {
    if (defaultValue) {
      setValues(defaultValue as string[]);
    }
  }, [defaultValue]);

  return (
    <Flex gap={"sm"} direction={"column"} ref={ref} className={classes?.flex}>
      <Text className={` font-bold ${classes?.title}`}>{title}</Text>
      <Text className={classes?.description}>{description}</Text>
      <Flex direction={"column"} gap={"xs"}>
        {(items || []).map(({ key, ...item }: any) => (
          <Checkbox
            onClick={() => {
              setValues((prev) => {
                let newValue: string[] = [];
                if (prev.includes(key)) {
                  newValue = prev.filter((k) => k !== key);
                } else {
                  newValue = [...prev, key];
                }
                name && setValue(name, newValue);
                return newValue;
              });
            }}
            checked={values.includes(key)}
            className={classes?.checkbox}
            key={item.key}
            {...item}
          />
        ))}
      </Flex>
    </Flex>
  );
});
