# Chapter II - Typescript

## Porque TypeScript?

O editor consegue saber exatamente os dados que um usuário pode ter e oferecer inteligência de IDE.

### Objetos

```jsx
interface User {
    name: string;
    username: string;
    document: string;
}

const user: User = {
    name: "Felipe",
    username: "felipe@",
    document: "33333"
}
```

### Funções

```jsx
function soma(num1:number, num2:number) {
    return num1 + num2;
}

console.log(soma(1,2))
```

### Classes

```jsx
interface Course {
    name: string;
    duration: number;
    educator?: string;
}

class CreateCourseService {
    execute({ name, duration, educator = "not educator" }: Course) {
        console.log(name, duration, educator)
    }
}

export default new CreateCourseService();
```

## Primeiro projeto com typescript

Iniciando

```jsx
yarn init -y
```

Biblioteca e tipagem

```jsx
yarn add express
yarn add @types/express -D
```

Instalando dependência do typescript e config

```jsx
yarn add typescript - D
yarn tsc --init
```

Mudando a pasta de conversão para javascript

tsconfig.json

```jsx
"outDir": "./dist",
```

Transformando de typescript para javascript

```jsx
yarn tsc
```

Rodar node

```jsx
node dist/server.js
```