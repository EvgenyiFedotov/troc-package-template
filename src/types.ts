export type MethodResult<
  Data = unknown,
  Error = unknown,
  Added extends object = object
> =
  | ({ data: Data; error: null } & Added)
  | ({ data: null; error: Error } & Added);
