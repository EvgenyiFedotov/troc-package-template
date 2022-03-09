export type MethodResult<
  Data = unknown,
  Error = unknown,
  Added extends object = object
> =
  | ({ data: Data; error: null } & Added)
  | ({ data: null; error: Error } & Added);

export type PackageJson = {
  name: string;
  version: string;
  devDependencies?: object;
  dependencies?: object;
};

export type StateJson = {
  repos: Record<string, { url: string }>;
};
