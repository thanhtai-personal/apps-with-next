import { IChapterCreation } from "@core-ui/novels-types"
import { CreateChapterDto as CoreCreateChapterDto } from "@core-modules/chapters"

export class CreateChapterDto extends CoreCreateChapterDto implements IChapterCreation {}