import * as path from "path";

import cloneGitRepo from "./clone-git-repo";
import { MethodResult } from "./types";
import parsePackageJson, { Instruction } from "./parse-package-json";

export default async function unwrapPackageTemplate(
  repo: Parameters<typeof cloneGitRepo>[0]
): Promise<MethodResult<Instruction[], string>> {
  const resultClone = await cloneGitRepo(repo);

  if ("error" in resultClone) return { error: "Error clone git repo" };

  const resultParse = await parsePackageJson(
    path.resolve(resultClone.data, "./package.json")
  );

  if ("error" in resultParse) return { error: "Error parse package.json" };

  return resultParse;
}
