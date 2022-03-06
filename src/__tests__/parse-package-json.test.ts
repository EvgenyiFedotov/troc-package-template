import * as fsp from "fs/promises";
import * as path from "path";

import spawn from "../spawn";
import parsePackageJson from "../parse-package-json";

describe("parse-package-json", () => {
  test("parse", async () => {
    const packageJsonFile = path.resolve(__dirname, "../../package.json");
    const data = JSON.parse((await fsp.readFile(packageJsonFile)).toString());
    const result = await parsePackageJson(data);

    const packageDir = path.resolve(__dirname, "./package");

    await fsp.mkdir(packageDir, {
      recursive: true,
    });
    await spawn("npm", ["init", "--force"], { cwd: packageDir });

    for (const instruction of result) {
      await spawn(...instruction, { cwd: packageDir });
    }
  });
});
