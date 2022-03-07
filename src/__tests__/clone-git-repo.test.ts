import * as path from "path";

import cloneGitRepo from "../clone-git-repo";

describe("clone-git-repo", () => {
  test("clone", async () => {
    const resultClone = await cloneGitRepo({
      url: "git+https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: path.join(__dirname, ".repos"),
    });

    if (!("data" in resultClone)) throw resultClone.error.toString();

    expect(resultClone.data).toBe(
      path.resolve(__dirname, "./.repos/EvgenyiFedotov/start-packages.git")
    );
  });

  test("clone without git+", async () => {
    const resultClone = await cloneGitRepo({
      url: "https://github.com/EvgenyiFedotov/start-packages.git",
      name: "package-repo-name",
      branch: "webpack/typescript-node",
      cwd: path.join(__dirname, ".repos"),
    });

    if (!("data" in resultClone)) throw resultClone.error.toString();

    expect(resultClone.data).toBe(
      path.resolve(__dirname, "./.repos/package-repo-name")
    );
  });
});
