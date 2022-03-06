import * as path from "path";
import * as fsp from "fs/promises";

import spawn from "./spawn";

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
}): Promise<string> {
  const url: URL = new URL(_url.replace("git+", ""));
  const branch: string = _branch || url.hash.replace("#", "") || "master";
  const cwd = _cwd || process.cwd();

  url.hash = "";

  const repoDir = path.join(cwd, ".repos", name || url.pathname);

  await spawn("git", ["clone", url.href, repoDir], { cwd });
  await spawn("git", ["checkout", branch], { cwd: repoDir });

  return repoDir;
}
