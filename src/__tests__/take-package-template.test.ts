import * as path from "path";
import * as fsp from "fs/promises";

import takePackageTemplate from "../take-package-template";
import spawn from "../spawn";

describe("take-package-template", () => {
  test("take", async () => {
    const packageDir = path.resolve(__dirname, "./package-take");

    await fsp.mkdir(packageDir, { recursive: true });
    await spawn("npm", ["init", "--force"], { cwd: packageDir });

    await takePackageTemplate({
      repo: {
        url: "https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
        cwd: path.join(__dirname, ".repos-take"),
      },
      targetDir: packageDir,
    });
  });
});
