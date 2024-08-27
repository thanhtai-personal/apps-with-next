import { Flex, FlexProps, Text } from "@core-ui/react-mantine-core";
import { IObjectSchemaProperty, ISchemaProperty } from "@core/json-schema";
import { ControlProps, ReactFormManager } from "@core-ui/react-hooks-form";
import { Fragment, forwardRef } from "react";
import { getControlProps } from "../getControlProps";

export interface ObjectControlProps
  extends ControlProps<IObjectSchemaProperty, FlexProps> { }

export const ObjectControl = forwardRef<HTMLDivElement, ObjectControlProps>(
  (props: ObjectControlProps, ref) => {
    const { label, description, name, ...other } = getControlProps(props);
    const {
      schema: { properties, required },
    } = props;
    return (
      <Flex direction="column" gap="md" ref={ref} {...other}>
        {label && <Text className="font-bold text-md">{label}</Text>}
        {description && <Text className=" italic mt-0">{description}</Text>}
        {Object.keys(
          properties as Record<string, ISchemaProperty<unknown>>,
        ).map((key) => {
          const propertyProps = properties[key];
          if (!propertyProps) {
            return null;
          }
          return (
            <Fragment key={key}>
              {ReactFormManager.getInstance().controlRenderer({
                schema: propertyProps,
                required: required?.includes(key),
                name: name ? `${name}.${key}` : key,
              })}
            </Fragment>
          );
        })}
      </Flex>
    );
  },
);
