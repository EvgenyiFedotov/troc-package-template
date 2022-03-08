import * as path from "path";
import * as fsp from "fs/promises";

import cloneGitRepo from "../clone-git-repo";

const reposDir = path.join(__dirname, ".repos");

beforeAll(async () => {
  await fsp.rm(reposDir, { force: true, recursive: true });
});

describe("clone-git-repo", () => {
  test("clone", async () => {
    const resultClone = await cloneGitRepo({
      url: "git+https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: reposDir,
    });

    if (resultClone.error) throw resultClone.error.toString();

    expect(resultClone.data).toBe(
      path.resolve(reposDir, "./EvgenyiFedotov/start-packages.git")
    );
  });

  test("clone without git+", async () => {
    const resultClone = await cloneGitRepo({
      url: "https://github.com/EvgenyiFedotov/start-packages.git",
      name: "package-repo-name",
      branch: "webpack/typescript-node",
      cwd: reposDir,
    });

    if (resultClone.error) throw resultClone.error.toString();

    expect(resultClone.data).toBe(
      path.resolve(reposDir, "./package-repo-name")
    );
  });
});
