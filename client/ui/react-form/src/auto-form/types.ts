import { ISchemaProperty } from "@core/json-schema";
import { ReactNode } from "react";

export type CommonKeywords = {
  title?: string;
  description?: string;
};

export type ControlProps<SchemaType extends ISchemaProperty, Props> = Props & {
  schema: SchemaType;
  required?: boolean;
  name?: string;
};

export interface ControlsMapper {
  match: <SchemaType extends ISchemaProperty>(schema: SchemaType) => boolean;
  component: <SchemaType extends ISchemaProperty, Props>(
    props: ControlProps<SchemaType, Props>,
  ) => ReactNode | ReactNode[];
}
