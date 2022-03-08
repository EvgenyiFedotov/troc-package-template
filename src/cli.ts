import { program } from "commander";
import { red } from "colors";
import { resolve } from "path";
import * as prompts from "prompts";

import { version } from "../package.json";

import useInstructions from "./use-instructions";
import cloneGitRepo from "./clone-git-repo";
import parsePackageJson from "./parse-package-json";
import checkoutGitRepo from "./checkout-git-repo";
import getGitRepoBranches from "./get-git-repo-branches";

program
  .version(version)
  .argument("<url>", "Repo url")
  .option("-i, --interactive", "Interactive mode")
  .action(async (url, { interactive = false }) => {
    const reposDir = resolve(__dirname, "./__troc-repos__");

    const resultClone = await cloneGitRepo({ url, cwd: reposDir });

    if (resultClone.error) {
      return console.error("\n", red(resultClone.error));
    }

    let branch: string | null = null;

    if (interactive) {
      const resultGetBranches = await getGitRepoBranches(resultClone.data);

      if (resultGetBranches.error) {
        return console.error("\n", red(resultGetBranches.error));
      }

      const resultPrompts = await prompts([
        {
          type: "select",
          name: "branch",
          message: "Pick branch",
          choices: resultGetBranches.data.map((name) => ({
            title: name,
            value: name,
          })),
        },
      ]);

      branch = resultPrompts.branch;
    }

    await checkoutGitRepo({ dir: resultClone.data, url, branch });

    const resultParse = await parsePackageJson(
      resolve(resultClone.data, "./package.json")
    );

    if (resultParse.error) {
      return console.error("\n", red(resultParse.error));
    }

    const targetDir = process.cwd();

    const resultUse = await useInstructions({
      targetDir,
      instructions: resultParse.data,
    });

    if (resultUse.error) return console.error(red(resultUse.error));
  });

program.parse(process.argv);
