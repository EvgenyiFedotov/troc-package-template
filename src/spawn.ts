import * as cp from "child_process";

export default function spawn(...args: Parameters<typeof cp.spawn>) {
  return new Promise<{ code: number; data: Buffer; error: Buffer | null }>(
    (resolve) => {
      const processSpawn = cp.spawn(...args);
      const resultData: Buffer[] = [];
      const resultError: Buffer[] = [];

      processSpawn.stdout.on("data", (data) => resultData.push(data));
      processSpawn.stderr.on("data", (data) => resultError.push(data));
      processSpawn.on("close", (code) =>
        resolve({
          code,
          data: Buffer.concat(resultData),
          error: resultError.length ? Buffer.concat(resultError) : null,
        })
      );
    }
  );
}
