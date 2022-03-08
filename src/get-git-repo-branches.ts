import spawn from "./spawn";
import { MethodResult } from "./types";

export default async function getGitRepoBranches(
  repoDir: string
): Promise<MethodResult<string[], string>> {
  const resultShowRef = await spawn("git", ["show-ref"], { cwd: repoDir });

  if (resultShowRef.code !== 0 && resultShowRef.error) {
    return { data: null, error: resultShowRef.error.toString() };
  }

  const data = resultShowRef.data
    .toString()
    .split("\n")
    .map((row) => {
      const [, name] = row.trim().split(" ");

      if (!name) return null;
      if (name.includes("HEAD")) return null;

      return name.replace(/^refs\/\w*\//, "");
    })
    .filter(Boolean);

  return { data, error: null };
}
