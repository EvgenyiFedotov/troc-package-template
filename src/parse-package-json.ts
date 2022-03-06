import { PackageJson } from "./read-package-json";

export type Instruction = [string, string[]];

export default async function parsePackageJson(
  json: PackageJson
): Promise<Instruction[]> {
  const instructions: Instruction[] = [];

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

  return instructions;
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
