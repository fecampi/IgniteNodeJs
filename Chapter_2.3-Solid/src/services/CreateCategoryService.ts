import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

// [x] - Definir o tipo de retorno
// [x] - Alterar o retorno do error
// [x] - Acessar o repositório

class CreateCategoryService {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already existis!");
    }

    this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryService };
