import spawn from "./spawn";
import { MethodResult } from "./types";

export default async function checkoutGitRepo({
  dir,
  url: _url,
  branch: _branch,
}: {
  dir: string;
  url?: string;
  branch?: string;
}): Promise<MethodResult<string, string>> {
  const url: URL = new URL(_url.replace("git+", ""));
  const branch: string = _branch || url.hash.replace("#", "") || "master";

  const resultGitCheckout = await spawn("git", ["checkout", branch], {
    cwd: dir,
  });

  if (resultGitCheckout.code !== 0 && resultGitCheckout.error) {
    return { data: null, error: resultGitCheckout.error.toString() };
  }

  return { data: branch, error: null };
}
