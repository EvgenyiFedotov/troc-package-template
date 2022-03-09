import * as fsp from "fs/promises";

import { MethodResult } from "./types";

export default async function readJson<Result extends object = object>(
  file: string
): Promise<MethodResult<Result, unknown>> {
  try {
    await fsp.access(file);

    return {
      data: JSON.parse((await fsp.readFile(file)).toString()),
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}
