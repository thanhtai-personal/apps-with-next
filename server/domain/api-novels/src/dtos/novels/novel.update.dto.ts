import { INovelUpdating } from "@core-ui/novels-types"
import { UpdateNovelDto as CoreUpdateNovelDto } from "@core-modules/novels"

export class UpdateNovelDto extends CoreUpdateNovelDto implements INovelUpdating {}