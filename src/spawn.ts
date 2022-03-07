import * as cp from "child_process";

import { MethodResult } from "./types";

export default function spawn(...args: Parameters<typeof cp.spawn>) {
  return new Promise<MethodResult<Buffer, Buffer, { code: number }>>(
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
