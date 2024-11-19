import { IAuthorCreation } from "@core-ui/novels-types"
import { CreateAuthorDto as CoreCreateAuthorDto } from "@core-modules/authors"

export class CreateAuthorDto extends CoreCreateAuthorDto implements IAuthorCreation {}