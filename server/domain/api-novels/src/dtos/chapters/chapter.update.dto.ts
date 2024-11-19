import { IChapterUpdating } from "@core-ui/novels-types"
import { UpdateChapterDto as CoreUpdateChapterDto } from "@core-modules/chapters"

export class UpdateChapterDto extends CoreUpdateChapterDto implements IChapterUpdating {}