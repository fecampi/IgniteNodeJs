# FirstProject

# FinApi - Financeira

## **REQUISITOS**

- [x]R01 - Deve ser possível criar uma conta;
- [x]R02 - Deve ser possível buscar o extrato bancário do cliente;
- [x]R03 - Deve ser possível realizar um depósito;
- [X]R04 - Deve ser possível realizar um saque;
- [X]R05 - Deve ser possível buscar o extrato bancário do cliente por data;
- [X]R06 - Deve ser possível atualizar dados do cliente;
- [x]R07 - Deve ser possível obter dados da conta do cliente;
- [x]R08 - Deve ser possível deletar uma conta.
- [x]R09 - Deve ser possível retornar o balance.

## **Regras de negócio**

- [x]RN01 - Não deve ser possível cadastrar uma conta com CPF já existente;
- [x]RN02 - Não deve ser possível buscar extrato em uma conta inexistente;
- [x]RN03 - Não deve ser possível fazer depósito em uma conta não existente;
- [x]RN04 - Não deve ser possível fazer saque em uma conta inexistente;
- [x]RN05 - Não deve ser possível fazer saque quando o saldo foi insuficiente.
- [x]RN06 - Não deve ser possível excluir uma conta não existente

## Análise de Requisitos

R01 - Deve ser possível criar uma conta;

```jsx
app.post("/account", (request, response) => {
	//code
  return response.status(201).send();
});
```

R02 - Deve ser possível buscar o extrato bancário do cliente;

```jsx
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  //code
  return response.json(customer.statement);
});
```

R03 - Deve ser possível realizar um depósito;

```jsx
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
	//code
  return response.status(201).send();
});
```

R04 - Deve ser possível realizar um saque;

```jsx
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
	//code
  return response.status(201).send();
});
```

R05 - Deve ser possível buscar o extrato bancário do cliente por data;

```jsx
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
	//code
  return response.json(statement);
});
```

R06 - Deve ser possível atualizar dados do cliente;

```jsx
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
	//cpde
  return response.json(statement);
});
```

R07 - Deve ser possível obter dados da conta do cliente;

```jsx
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  //code
  return response.json(customer);
});
```

R08 - Deve ser possível deletar uma conta;

```jsx
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
	//code
  return response.status(200).json(customers);
});
```

R09 - Deve ser possível retornar o balance.

```jsx
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
	//code
	return response.json(balance);
});
```

### Análise das **Regras de negócio**

RN01 - Não deve ser possível cadastrar uma conta com CPF já existente;

```jsx
const customersAlreadyExist = customers.some(
    (customers) => customers.cpf === cpf
  );
  if (customersAlreadyExist) {
    return response.status(404).json({ error: "Customer already exists!" });
  }
```

RN02 - Não deve ser possível buscar extrato em uma conta inexistente;

RN03 - Não deve ser possível fazer depósito em uma conta não existente;

RN04 - Não deve ser possível fazer saque em uma conta inexistente;

RN06 - Não deve ser possível excluir uma conta não existente.

```jsx
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }
  request.customer = customer;
  return next();
}
```

RN05 - Não deve ser possível fazer saque quando o saldo foi insuficiente;

```jsx
if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" });
  }
```