import { INovelCreation } from "@core-ui/novels-types"
import { CreateNovelDto as CoreCreateNovelDto } from "@core-modules/novels"

export class CreateNovelDto extends CoreCreateNovelDto implements INovelCreation {}