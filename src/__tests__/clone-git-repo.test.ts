import * as path from "path";

import cloneGitRepo from "../clone-git-repo";

describe("clone-git-repo", () => {
  test("clone", async () => {
    const repoDir = await cloneGitRepo({
      url: "git+https://github.com/EvgenyiFedotov/start-packages.git#eslint/typescript",
      cwd: __dirname,
    });

    expect(repoDir).toBe(
      path.resolve(__dirname, "./.repos/EvgenyiFedotov/start-packages.git")
    );
  });

  test("clone without git+", async () => {
    const repoDir = await cloneGitRepo({
      url: "https://github.com/EvgenyiFedotov/start-packages.git",
      name: "package-repo-name",
      branch: "webpack/typescript-node",
      cwd: __dirname,
    });

    expect(repoDir).toBe(path.resolve(__dirname, "./.repos/package-repo-name"));
  });
});
