import { program } from "commander";
import { red } from "colors";
import { resolve } from "path";

import { version } from "../package.json";

import unwrapPackageTemplate from "./unwrap-package-template";
import useInstructions from "./use-instructions";

program
  .version(version)
  .argument("<url>", "Repo url")
  .option("-i, --interactive", "Interactive mode")
  .action(async (url) => {
    const reposDir = resolve(__dirname, "./__troc-repos__");
    const resultUnwrap = await unwrapPackageTemplate({ url, cwd: reposDir });

    if (resultUnwrap.error) {
      return console.error("\n", red(resultUnwrap.error));
    }

    const targetDir = process.cwd();

    const resultUse = await useInstructions({
      targetDir,
      instructions: resultUnwrap.data,
    });

    if ("error" in resultUse) return console.error(red(resultUse.error));
  });

// program
//   .command("publish [packageName]")
//   .alias("pub")
//   .option("--tag <tag>", "Tag for publishing")
//   .description("Publish packages to local registry")
//   .action(publish);

program.parse(process.argv);
