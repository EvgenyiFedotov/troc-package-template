import * as path from "path";
import * as fsp from "fs/promises";

import spawn from "../spawn";
import unwrapPackageTemplate from "../unwrap-package-template";
import useInstructions from "../use-instructions";

const reposDir = path.join(__dirname, ".repos-use");
const packageDir = path.resolve(__dirname, "./package-use");

beforeAll(async () => {
  await fsp.rm(reposDir, { force: true, recursive: true });
  await fsp.rm(packageDir, { force: true, recursive: true });
});

describe("use-instructions", () => {
  test("use", async () => {
    const resultUnwrap = await unwrapPackageTemplate({
      url: "https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: reposDir,
    });

    if (resultUnwrap.error) return resultUnwrap;

    await fsp.mkdir(packageDir, { recursive: true });
    await spawn("npm", ["init", "--force"], { cwd: packageDir });

    await useInstructions({
      targetDir: packageDir,
      instructions: resultUnwrap.data,
    });
  });
});
