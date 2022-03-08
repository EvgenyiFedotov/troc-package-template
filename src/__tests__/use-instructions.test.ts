import * as path from "path";
import * as fsp from "fs/promises";

import spawn from "../spawn";
import useInstructions from "../use-instructions";
import cloneGitRepo from "../clone-git-repo";
import parsePackageJson from "../parse-package-json";

const reposDir = path.join(__dirname, ".repos-use");
const packageDir = path.resolve(__dirname, "./package-use");

beforeAll(async () => {
  await fsp.rm(reposDir, { force: true, recursive: true });
  await fsp.rm(packageDir, { force: true, recursive: true });
});

describe("use-instructions", () => {
  test("use", async () => {
    const resultClone = await cloneGitRepo({
      url: "https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: reposDir,
    });

    if (resultClone.error) return resultClone;

    const resultParse = await parsePackageJson(
      path.resolve(resultClone.data, "./package.json")
    );

    if (resultParse.error) return resultParse;

    await fsp.mkdir(packageDir, { recursive: true });
    await spawn("npm", ["init", "--force"], { cwd: packageDir });

    await useInstructions({
      targetDir: packageDir,
      instructions: resultParse.data,
    });
  });
});
