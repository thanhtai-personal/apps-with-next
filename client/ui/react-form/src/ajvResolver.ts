import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import Ajv, { DefinedError, Options } from "ajv";
import ajvErrorsModule from "ajv-errors";
import ajvFormats from "ajv-formats";
import { JSONSchema } from "json-schema-to-ts";
import {
  FieldError,
  FieldValues,
  ResolverOptions,
  ResolverResult,
  appendErrors,
} from "react-hook-form";

// workaround since ajv-errors does not export types
// const Ajv = ajv.default;
const ajvErrors = ajvErrorsModule.default;
const addFormats = ajvFormats.default;

const parseErrorSchema = (
  ajvErrors: DefinedError[],
  validateAllFieldCriteria: boolean,
) => {
  ajvErrors.forEach((error) => {
    if (error.keyword === "required") {
      error.instancePath += "/" + error.params.missingProperty;
    }
  });

  return ajvErrors.reduce<Record<string, FieldError>>((previous, error) => {
    const path = error.instancePath.substring(1).replace(/\//g, ".");

    if (!previous[path]) {
      previous[path] = {
        message: error.message,
        type: error.keyword,
      };
    }

    if (validateAllFieldCriteria) {
      const types = previous[path]?.types;
      const messages = types && types[error.keyword];

      previous[path] = appendErrors(
        path,
        validateAllFieldCriteria,
        previous,
        error.keyword,
        messages
          ? ([] as string[]).concat(messages as string[], error.message || "")
          : error.message,
      ) as FieldError;
    }

    return previous;
  }, {});
};

type Resolver = (
  schema: JSONSchema,
  schemaOptions?: Options,
  factoryOptions?: {
    mode?: "async" | "sync";
  },
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>,
) => Promise<ResolverResult<TFieldValues>>;

export const ajvResolver: Resolver =
  (schema, schemaOptions, resolverOptions = {}) =>
  // eslint-disable-next-line @typescript-eslint/require-await
  async (values, _, options) => {
    const ajv = new Ajv({
      allErrors: true,
      validateSchema: true,
      removeAdditional: "failing",
      ...(schemaOptions || {}),
    });

    ajvErrors(ajv);
    addFormats(ajv);

    const validate = ajv.compile(
      Object.assign(
        { $async: resolverOptions && resolverOptions.mode === "async" },
        schema,
      ),
    );

    const valid = validate(values);

    options.shouldUseNativeValidation && validateFieldsNatively({}, options);

    return valid
      ? { values, errors: {} }
      : {
          values: {},
          errors: toNestErrors(
            parseErrorSchema(
              validate.errors as DefinedError[],
              !options.shouldUseNativeValidation &&
                options.criteriaMode === "all",
            ),
            options,
          ),
        };
  };
