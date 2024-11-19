import { ICommentUpdating } from "@core-ui/novels-types"
import { UpdateCommentDto as CoreUpdateCommentDto } from "@core-modules/comments"

export class UpdateCommentDto extends CoreUpdateCommentDto implements ICommentUpdating {}