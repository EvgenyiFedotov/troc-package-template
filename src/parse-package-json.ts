import * as path from "path";

import { MethodResult, PackageJson } from "./types";
import readPackageJson from "./read-json";

export type Instruction = [string, string[]];

export default async function parsePackageJson(
  file: string
): Promise<MethodResult<Instruction[], any>> {
  const resultRead = await readPackageJson<PackageJson>(file);

  if (resultRead.error) return { data: null, error: resultRead.error };

  const json = resultRead.data;
  const instructions: Instruction[] = [];

  // Install current package (for running scripts from package.json)
  instructions.push(["npm", ["install", path.dirname(file)]]);

  // Dependencies
  const deps: string[] = getDepPackages(json, "dependencies");

  if (deps.length) {
    instructions.push(["npm", ["install", ...deps, "--save"]]);
  }

  // Dev dependencies
  const devDeps: string[] = getDepPackages(json, "devDependencies");

  if (devDeps.length) {
    instructions.push(["npm", ["install", ...devDeps, "--save-dev"]]);
  }

  instructions.push(["npm", ["uninstall", json.name]]);

  return { data: instructions, error: null };
}

function getDepPackages(
  json: PackageJson,
  key: "devDependencies" | "dependencies"
): string[] {
  const dependencies: object = json[key];
  const packages: string[] = [];

  for (const key in dependencies) {
    packages.push(`${key}@${dependencies[key]}`);
  }

  return packages;
}
