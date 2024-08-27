import {
  ControlProps,
  ControlsMapper,
  array,
  boolean,
  file,
  integer,
  number,
  object,
  string,
  arrayValue,
} from "@core-ui/react-hooks-form";
import {
  ArrayValueFormat,
  IArraySchemaProperty,
  IArrayValueSchemaProperty,
  IBooleanSchemaProperty,
  INumberSchemaProperty,
  IObjectSchemaProperty,
  IStringSchemaProperty,
  StringFormat,
} from "@core/json-schema";
import {
  ArrayControl,
  BooleanControl,
  DateControl,
  DateTimeControl,
  FileControl,
  NumberControl,
  ObjectControl,
  TextControl,
  PasswordControl,
  TimeControl,
  MultipleCheckListControl,
} from "./controls";

export const controls: ControlsMapper[] = [
  {
    match: object(),
    component: (props: ControlProps<IObjectSchemaProperty, any>) => (
      <ObjectControl {...props} />
    ),
  },
  {
    match: array(),
    component: (props: ControlProps<IArraySchemaProperty, any>) => (
      <ArrayControl {...props} />
    ),
  },
  {
    match: boolean(),
    component: (props: ControlProps<IBooleanSchemaProperty, any>) => (
      <BooleanControl {...props} />
    ),
  },
  {
    match: integer(),
    component: (props: ControlProps<INumberSchemaProperty, any>) => (
      <NumberControl {...props} />
    ),
  },
  {
    match: number(),
    component: (props: ControlProps<INumberSchemaProperty, any>) => (
      <NumberControl {...props} hideControls />
    ),
  },
  {
    match: file(),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <FileControl {...props} multiple={false} />
    ),
  },
  {
    match: string(StringFormat.Date),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <DateControl {...props} />
    ),
  },
  {
    match: string(StringFormat.DateTime),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <DateTimeControl {...props} />
    ),
  },
  {
    match: string(StringFormat.Time),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <TimeControl {...props} />
    ),
  },
  {
    match: string(StringFormat.Email),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <TextControl {...props} type="email" />
    ),
  },
  {
    match: string(StringFormat.Password),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <PasswordControl {...props} />
    ),
  },
  {
    match: arrayValue(ArrayValueFormat.Checkbox),
    component: (props: ControlProps<IArrayValueSchemaProperty, any>) => (
      <MultipleCheckListControl {...props} />
    ),
  },
  {
    match: string(),
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <TextControl {...props} />
    ),
  },
  {
    match: () => true, //other
    component: (props: ControlProps<IStringSchemaProperty, any>) => (
      <TextControl {...props} />
    ),
  },
];
