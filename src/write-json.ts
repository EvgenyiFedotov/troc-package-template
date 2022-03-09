import * as fsp from "fs/promises";
import { MethodResult } from "types";

type Stringify = typeof JSON.stringify;

export default async function writeJson(
  file: string,
  json: object,
  replacer: Parameters<Stringify>[1] = null,
  space: Parameters<Stringify>[2] = 2
): Promise<MethodResult<void, string>> {
  try {
    await fsp.writeFile(file, JSON.stringify(json, replacer, space));

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
