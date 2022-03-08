import { Instruction } from "./parse-package-json";
import { MethodResult } from "./types";
import spawn from "./spawn";

export default async function useInstructions({
  targetDir,
  instructions,
}: {
  targetDir: string;
  instructions: Instruction[];
}): Promise<MethodResult<void, string>> {
  for (const instruction of instructions) {
    await spawn(...instruction, { cwd: targetDir });
  }

  return { data: undefined, error: null };
}
