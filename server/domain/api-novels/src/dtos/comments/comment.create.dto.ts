import { ICommentCreation } from "@core-ui/novels-types"
import { CreateCommentDto as CoreCreateCommentDto } from "@core-modules/comments"

export class CreateCommentDto extends CoreCreateCommentDto implements ICommentCreation {}