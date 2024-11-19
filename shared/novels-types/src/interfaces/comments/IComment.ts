export interface IComment {
  id?: number;
  username?: string;
  email?: string;
  avatar?: string;
  userId?: number;
  novelId?: number;
  chapterId?: number;
  content?: string;
  htmlContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  