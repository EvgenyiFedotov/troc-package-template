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
import readJson from "./read-json";
import { StateJson } from "./types";
import writeJson from "./write-json";

program
  .version(version)
  .argument("<url>", "Repo url")
  .option("-i, --interactive", "Interactive mode")
  .action(async (url, { interactive = false }) => {
    // Read state
    const stateFile = resolve(__dirname, "./state.json");

    console.log(stateFile);

    const resultReadState = await readJson<StateJson>(stateFile);

    const state: StateJson = resultReadState.error
      ? { repos: {} }
      : resultReadState.data;

    // Clone repo
    const reposDir = resolve(__dirname, "./__troc-repos__");

    const resultClone = await cloneGitRepo({ url, cwd: reposDir });

    if (resultClone.error) {
      return console.error("\n", red(resultClone.error));
    }

    // Get branch
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

    // Get instructions
    const resultParse = await parsePackageJson(
      resolve(resultClone.data, "./package.json")
    );

    if (resultParse.error) {
      return console.error("\n", red(resultParse.error));
    }

    // Use instructions
    const targetDir = process.cwd();

    const resultUse = await useInstructions({
      targetDir,
      instructions: resultParse.data,
    });

    if (resultUse.error) return console.error(red(resultUse.error));

    if (interactive) {
      // Save repo to local
      const { alias } = await prompts([
        {
          type: "text",
          name: "alias",
          message: "Enter alias of current repo",
          initial: "base",
        },
      ]);

      if (alias) {
        state.repos[alias] = { url };

        const resultWrite = await writeJson(stateFile, state);

        if (resultWrite.error) {
          return console.error("\n", red(resultWrite.error));
        }
      }
    }
  });

program.parse(process.argv);
