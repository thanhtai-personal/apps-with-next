import { Args, Command } from "@oclif/core";
import { Barrelsby } from "barrelsby/bin";
import path from "path";
import { generateService, generateZod } from "~/generators";

export default class Generate extends Command {
  static args = {
    input: Args.string({ description: "Input path", required: true }),
    output: Args.string({ description: "Output path", required: true }),
  };

  static description: string = "Generate code";
  static examples: Command.Example[] = ["ttt generate"];

  async run() {
    const { args } = await this.parse(Generate);
    const input = path.resolve(process.cwd(), args.input);
    const output = path.resolve(process.cwd(), args.output);

    const outputService = output + "/services";

    if (!require("fs").existsSync(outputService)) {
      require("fs").mkdirSync(outputService, { recursive: true });
    }

    await generateService({ input, output: outputService });

    Barrelsby({ directory: outputService, name: "index" });

    const outputZod = output + "/zod";

    if (!require("fs").existsSync(outputZod)) {
      require("fs").mkdirSync(outputZod, { recursive: true });
    }

    await generateZod({ input, output: outputZod });

    Barrelsby({ directory: outputZod, name: "index" });
  }
}
