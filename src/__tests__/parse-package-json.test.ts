import * as fsp from "fs/promises";
import * as path from "path";

import spawn from "../spawn";
import parsePackageJson from "../parse-package-json";

describe("parse-package-json", () => {
  test("parse", async () => {
    const result = await parsePackageJson(
      path.resolve(__dirname, "../../package.json")
    );

    if ("error" in result) return result;

    const packageDir = path.resolve(__dirname, "./package");

    await fsp.mkdir(packageDir, { recursive: true });
    await spawn("npm", ["init", "--force"], { cwd: packageDir });

    for (const instruction of result.data) {
      await spawn(...instruction, { cwd: packageDir });
    }
  });
});
