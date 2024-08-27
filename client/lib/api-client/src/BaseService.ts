import { FetchApi } from "./createApi";

export abstract class BaseService<Paths> {
  constructor(protected api: FetchApi<Paths>) {}
}
