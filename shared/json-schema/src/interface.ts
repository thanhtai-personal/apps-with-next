import {
  ArrayValueFormat,
  IntegerFormat,
  JsonSchemaType,
  NumberFormat,
  StringFormat,
} from "./enum.js";

export type EnumValue<T> = T[keyof T];

export interface ISchemaProperty<T = any> {
  type: EnumValue<JsonSchemaType>;
  title?: string;
  description?: string;
  default?: T;
  examples?: T[];
}

export interface IScalarSchemaProperty<T = any> extends ISchemaProperty<T> {
  enum?: T[];
  const?: T;
}

export interface INumberSchemaProperty extends IScalarSchemaProperty<number> {
  type: JsonSchemaType.Number;
  format?: NumberFormat;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
}

export interface IIntegerSchemaProperty extends IScalarSchemaProperty<number> {
  type: JsonSchemaType.Integer;
  format?: IntegerFormat;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
}

export interface IStringSchemaProperty extends IScalarSchemaProperty<string> {
  type: JsonSchemaType.String;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: StringFormat;
}

export interface IArrayValueSchemaProperty extends IScalarSchemaProperty<string[]> {
  type: JsonSchemaType.ArrayValue;
  items: any[];
  defaultValue?: string[];
  format?: ArrayValueFormat;
  classes?: {
    flex?: string;
    title?: string;
    description?: string;
    checkbox?: string;
  }
}

export interface IBooleanSchemaProperty extends IScalarSchemaProperty<boolean> {
  type: JsonSchemaType.Boolean;
}

export interface IObjectSchemaProperty
  extends ISchemaProperty<ISchemaProperty> {
  type: JsonSchemaType.Object;
  properties: { [key: string]: ISchemaProperty };
  required?: string[];
  maxProperties?: number;
  minProperties?: number;
  dependencies?: { [key: string]: ISchemaProperty | string[] };
}

export interface IArraySchemaProperty
  extends ISchemaProperty<ISchemaProperty[]> {
  type: JsonSchemaType.Array;
  items: ISchemaProperty;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  contains?: ISchemaProperty;
}
