import * as path from "path";
import * as fsp from "fs/promises";

import spawn from "./spawn";
import { MethodResult } from "./types";

export default async function cloneGitRepo({
  url: _url,
  name,
  branch: _branch,
  cwd: _cwd,
}: {
  url: string;
  name?: string;
  branch?: string;
  cwd?: string;
}): Promise<MethodResult<string, string>> {
  const url: URL = new URL(_url.replace("git+", ""));
  const branch: string = _branch || url.hash.replace("#", "") || "master";
  const cwd = _cwd || path.resolve(process.cwd(), "./.repos");

  url.hash = "";

  const repoDir = path.join(cwd, name || url.pathname);

  try {
    await fsp.mkdir(cwd, { recursive: true });
  } catch (error) {
    return { error };
  }

  const resultGitClone = await spawn("git", ["clone", url.href, repoDir], {
    cwd,
  });

  if (!("data" in resultGitClone))
    return { error: resultGitClone.error.toString() };

  const resultGitCheckout = await spawn("git", ["checkout", branch], {
    cwd: repoDir,
  });

  if (!("data" in resultGitCheckout))
    return { error: resultGitCheckout.error.toString() };

  return { data: repoDir };
}
