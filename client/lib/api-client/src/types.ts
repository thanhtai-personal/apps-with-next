import { ParamMap } from "urlcat";

type Any = { [key: string]: any };

export type AllMethod = "get" | "put" | "post" | "delete" | "patch";
export type BodyMethod = Exclude<AllMethod, "get">;

type ReturnType<T> = "200" extends keyof T
  ? T["200"]
  : "201" extends keyof T
    ? T["201"]
    : "204" extends keyof T
      ? T["204"]
      : "default" extends keyof T
        ? T["default"]
        : unknown;

export type Query<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "query" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["query"]
      : Any
    : Any
  : Any;

type Path<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "path" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["path"]
      : Any
    : Any
  : Any;

export type Body<
  Paths,
  K extends keyof Paths,
  Method extends BodyMethod,
> = Method extends keyof Paths[K]
  ? "request" extends keyof Paths[K][Method]
    ? "body" extends keyof Paths[K][Method]["request"]
      ? Paths[K][Method]["request"]["body"]
      : Any
    : Any
  : Any;

export type SuccessResponse<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Method extends keyof Paths[K]
  ? "responses" extends keyof Paths[K][Method]
    ? ReturnType<Paths[K][Method]["responses"]>
    : Any
  : Any;

export type Params<
  Paths,
  K extends keyof Paths,
  Method extends AllMethod,
> = Query<Paths, K, Method> & Path<Paths, K, Method> & ParamMap;

export type PathsWithMethod<Paths, PathnameMethod extends AllMethod> = {
  [Pathname in keyof Paths]: Paths[Pathname] extends {
    [K in PathnameMethod]: any;
  }
    ? Pathname
    : never;
}[keyof Paths];
