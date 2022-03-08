import * as fsp from "fs/promises";

import { MethodResult } from "./types";

export type PackageJson = {
  name: string;
  version: string;
  devDependencies?: object;
  dependencies?: object;
};

export default async function readPackageJson(
  file: string
): Promise<MethodResult<PackageJson, any>> {
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
