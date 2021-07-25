import { Controller } from '@nestjs/common';
import { CategoryService } from '../category/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
