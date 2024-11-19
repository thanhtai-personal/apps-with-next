import { IAuthorCreation } from "@core-ui/novels-types"
import { UpdateAuthorDto as CoreUpdateAuthorDto } from "@core-modules/authors"

export class UpdateAuthorDto extends CoreUpdateAuthorDto implements IAuthorCreation {}