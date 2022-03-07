export type MethodResult<
  Data = unknown,
  Error = unknown,
  Added extends object = object
> = ({ data: Data } & Added) | ({ error: Error } & Added);
