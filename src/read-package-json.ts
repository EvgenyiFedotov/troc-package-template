import * as fsp from "fs/promises";

export type PackageJson = {
  devDependencies?: object;
  dependencies?: object;
};

export default async function readPackageJson(
  file: string
): Promise<{ value?: PackageJson; error?: unknown }> {
  try {
    await fsp.access(file);
    return { value: JSON.parse((await fsp.readFile(file)).toString()) };
  } catch (error) {
    return { error };
  }
}
