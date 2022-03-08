import * as path from "path";
import * as fsp from "fs/promises";

import spawn from "./spawn";
import { MethodResult } from "./types";

export default async function cloneGitRepo({
  url: _url,
  name,
  cwd: _cwd,
}: {
  url: string;
  name?: string;
  branch?: string;
  cwd?: string;
}): Promise<MethodResult<string, string>> {
  const url: URL = new URL(_url.replace("git+", ""));
  const cwd = _cwd || path.resolve(process.cwd(), "./.repos");

  url.hash = "";

  try {
    await fsp.mkdir(cwd, { recursive: true });
  } catch (error) {
    return { data: null, error };
  }

  const repoDir = path.join(cwd, name || url.pathname);

  try {
    await fsp.rm(repoDir, { recursive: true, force: true });
  } catch (error) {
    return { data: null, error };
  }

  const resultGitClone = await spawn("git", ["clone", url.href, repoDir], {
    cwd,
  });

  if (resultGitClone.code !== 0 && resultGitClone.error) {
    return { data: null, error: resultGitClone.error.toString() };
  }

  return { data: repoDir, error: null };
}
