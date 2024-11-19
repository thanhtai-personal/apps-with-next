import { readFileSync } from "fs";
import path from "path";
import { generateZodClientFromOpenAPI } from "openapi-zod-client";

interface GenerateOptions {
  input: string;
  output: string;
}

export const generateZod = async (options: GenerateOptions) => {
  const doc = readFileSync(options.input, "utf-8");
  await generateZodClientFromOpenAPI({
    openApiDoc: JSON.parse(doc),
    distPath: options.output + "/schemas.ts",
    templatePath: path.join(
      __dirname,
      "../../dist/resource/templates/openapi-zod-client/schema.hbs",
    ),
  });
};
