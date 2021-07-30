import { Category } from '../../category/schemas/category.schema';
import { Tag } from '../../tag/schemas/tag.schema';
import { User } from '../../user/schemas/user.schema';

export class ArticleGetResDto {
  title: string;

  user: User;

  category: Category;

  tags: Tag[];

  content: string;

  deleted: boolean;
}
