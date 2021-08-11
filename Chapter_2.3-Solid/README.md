# Chapter II - S.O.L.I.D

## S ⇒ SRP - Single Responsibility Principle

### (Princípio da Responsabilidade Única)

```jsx
class DebitoContaCorrente

{
    DebitarConta(valor: number) { }
}

 
class SaldoContaCorrente

{
     ValidarSaldo(valor:number) { }
}

 
class ComprovanteContaCorrente

{
    EmitirComprovante() { }
}
```

## D ⇒ DIP - Dependency Inversion Principle

### (Princípio da Inversão de Dependência)

O service(Alto-Nivel) não deve conhecer qual o tipo do Repository(Baixo-Nivel)

Service

```jsx
import CategoriesRepository from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
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

```

Rota

```jsx
const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
```

## L ⇒ LSP - Language Service Provider

### (Princípio da Substituição de Liskov)

Partes de um sistema devem aderir a um contrato(interface) de substituição

```jsx
import { Category } from "../model/Category";

// DTO => Data transfer Object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
```