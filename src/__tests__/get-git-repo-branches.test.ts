import { join } from "path";
import { rm } from "fs/promises";

import cloneGitRepo from "../clone-git-repo";
import getGitRepoBranches from "../get-git-repo-branches";

const reposDir = join(__dirname, ".repos-branches");

beforeAll(async () => {
  await rm(reposDir, { recursive: true, force: true });
});

describe("get-git-repo-branches", () => {
  test("get", async () => {
    const resultClone = await cloneGitRepo({
      url: "https://github.com/EvgenyiFedotov/start-packages.git",
      branch: "webpack/typescript-node",
      cwd: reposDir,
    });

    if (resultClone.error) throw resultClone;

    const result = await getGitRepoBranches(resultClone.data);

    expect(result.data.includes("master")).toBe(true);
  });
});
