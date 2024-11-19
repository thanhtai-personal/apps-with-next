import path from "path";

interface GenerateOptions {
  input: string;
  output: string;
}

export const generateService = async (options: GenerateOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { generateApi } = require("swagger-typescript-api");
  await generateApi({
    ...options,
    templates: path.join(__dirname, "../../dist/resource/templates/sta"),
    httpClientType: "axios",
    generateClient: false,
    generateResponses: true,
    generateRouteTypes: true,
    generateUnionEnums: true,
    cleanOutput: true,
    unwrapResponseData: true,
    modular: true,
    moduleNameIndex: 0,
    extractRequestBody: true,
    extractRequestParams: true,
    primitiveTypeConstructs: (constructs: object) => ({
      ...constructs,
      string: {
        "date-time": "Date",
      },
    }),
  });
};
