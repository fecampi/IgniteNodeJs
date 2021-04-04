# Ignite - NodeJs

### Configurando

Inicializando o Projeto

```jsx
yarn init -y   
```

Instalando o Express

```jsx
yarn add expresss 
```

Instalando o nodemon no modo desenvolvimento

```jsx
yarn add nodemon -D
```

Package.json

```jsx
{
  "scripts": {
    "dev":"nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

### Rest API methods:

GET → Buscar;

[http://localhost:3333/courses/1?page=1&order=asc](http://localhost:3333/courses/1?page=1&order=asc)

```jsx
app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query)
  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});
```

**Query  Params (Paginação, filtro de busca)**

```jsx
http://example.com/v1/user?page=2&limit=50
Chave
valor
Separação
```

---

POST → Inserir

[http://localhost:3333/courses](http://localhost:3333/courses)

```jsx
app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body)
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});
```

**Body Params (inserção ou alteração através de um JSON)**

```jsx
{
"name": "Peter",
"USERNAME": "petisco"
}
```

---

PUT → Atualização;

[http://localhost:3333/courses/333](http://localhost:3333/courses/333)

```jsx
app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});
```

---

PATCH → Atualização parcial.

[http://localhost:3333/courses/1](http://localhost:3333/courses/1)

```jsx
app.patch("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});
```

---

DELETE → Deleção;

[http://localhost:3333/courses/3](http://localhost:3333/courses/3)

```jsx
app.delete("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 2", "Curso 4"]);
});
```

### Other parameters:

**Headers Params**

```jsx
authority: http://app.example.com
method: GET
path: /api/nodes
schemes: https
referer https://app.example.com/example
```

**Route Params (Editar, Deletar e Buscar)**

```jsx
[http://endereco](http://endereco)servidor.com.br/v1/user/{id}
```

### **HTTP CODES**

1XX: **Informativo - A solicitação foi aceita ou o processo continua em andamento;**

2XX: **Confirmação**

200 - Requisição bem sucedida

201 - Created - Geralmente usado para POST após uma inserção

3XX: **Redirecionamento**

301 - Moved Permanently

302 - Moved

4XX: **Erro do cliente**

400 - Bad Request

401 - Unauthorized

403 - Forbidden

404 - Not Found

422 - Unprocessable Entity

**5XX: ERRO no servidor - O servidor falhou ao concluir a solicitação.**

500 - Internal Server Error

502 - Bad Gateway