import * as path from "path";
import * as fsp from "fs/promises";

import unwrapPackageTemplate from "../unwrap-package-template";

const reposDir = path.join(__dirname, ".repos-take");

beforeAll(async () => {
  await fsp.rm(reposDir, { force: true, recursive: true });
});

describe("take-package-template", () => {
  test("take", async () => {
    const result = await unwrapPackageTemplate({
      url: "https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: reposDir,
    });

    if ("error" in result) throw result.error;

    expect(result.data).toBeInstanceOf(Array);
  });
});
