import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

export abstract class BaseService {
  protected populate: string[] = [];

  constructor() {
    this.populate = []
  }

  abstract findAll<T, K>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>>
  abstract find<T, K>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>>
  abstract findOne<T>(id: number): Promise<T | null>
  abstract update<T, K>(permissionId: number, updatePermissionDto: T): Promise<K>
  abstract patchUpdate<T, K>(permissionId: number, updatePermissionDto: T): Promise<K>
  abstract create<T, K>(requestedPermission: T): Promise<K>
  abstract delete(id: number): Promise<void>
}