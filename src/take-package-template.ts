import * as path from "path";

import cloneGitRepo from "./clone-git-repo";
import { MethodResult } from "./types";
import parsePackageJson from "./parse-package-json";
import spawn from "./spawn";

export default async function takePackageTemplate({
  repo,
  targetDir,
}: {
  repo: Parameters<typeof cloneGitRepo>[0];
  targetDir: string;
}): Promise<MethodResult<void, string>> {
  const resultClone = await cloneGitRepo(repo);

  if ("error" in resultClone) return { error: "Error clone git repo" };

  const resultParse = await parsePackageJson(
    path.resolve(resultClone.data, "./package.json")
  );

  if ("error" in resultParse) return { error: "Error parse package.json" };

  for (const instruction of resultParse.data) {
    await spawn(...instruction, { cwd: targetDir });
  }
}
