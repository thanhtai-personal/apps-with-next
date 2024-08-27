import {
  ArrayValueFormat,
  IArrayValueSchemaProperty,
  IIntegerSchemaProperty,
  INumberSchemaProperty,
  ISchemaProperty,
  IStringSchemaProperty,
  IntegerFormat,
  JsonSchemaType,
  NumberFormat,
  StringFormat,
} from "@core/json-schema";

const isStringSchema = (
  schema: ISchemaProperty,
): schema is IStringSchemaProperty => {
  return schema.type === JsonSchemaType.String;
};

const isArrayValueSchema = (
  schema: ISchemaProperty,
): schema is IArrayValueSchemaProperty => {
  return schema.type === JsonSchemaType.ArrayValue;
};

const isNumberSchema = (
  schema: ISchemaProperty,
): schema is INumberSchemaProperty => {
  return schema.type === JsonSchemaType.Number;
};

export const isIntegerSchema = (
  schema: ISchemaProperty,
): schema is IIntegerSchemaProperty => {
  return schema.type === JsonSchemaType.Integer;
};

export const object = () => (schema: ISchemaProperty) => {
  return schema.type === JsonSchemaType.Object;
};

export const array = () => (schema: ISchemaProperty) => {
  return schema.type === JsonSchemaType.Array;
};

export const boolean = () => (schema: ISchemaProperty) => {
  return schema.type === JsonSchemaType.Boolean;
};

export const string = (format?: StringFormat) => {
  return (schema: ISchemaProperty) => {
    return isStringSchema(schema) && !(format && schema.format !== format);
  };
};

export const arrayValue = (format?: ArrayValueFormat) => {
  return (schema: ISchemaProperty) => {
    return isArrayValueSchema(schema) && !(format && schema.format !== format);
  };
};

export const file = () => (schema: ISchemaProperty) => {
  return string(StringFormat.Binary)(schema);
};

export const number = (format?: NumberFormat) => {
  return (schema: ISchemaProperty) => {
    return isNumberSchema(schema) && !(format && schema.format !== format);
  };
};

export const integer = (format?: IntegerFormat) => {
  return (schema: ISchemaProperty) => {
    return isIntegerSchema(schema) && !(format && schema.format !== format);
  };
};
