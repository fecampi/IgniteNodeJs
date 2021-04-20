const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const customers = [];

// middleware Global
app.use(express.json());

// middleware - Regras de Negocio
// RN02 - Não Deve ser possível fazer depósito em uma conta não existente;
// RN03 - Não Deve ser possível buscar um extrato em uma conta não existente;
// RN04 - Não Deve ser possível fazer saque em uma conta inexistente;
// RN06 - Não deve ser possível excluir uma conta não existente
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }
  request.customer = customer;
  return next();
}
function getBalance(statement) {
  //todos os valores em apenas um
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

// R01 - Deve ser possível criar uma conta;
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  // RN01 - Não Deve ser possível cadastrar uma conta com CPF já existente;
  const customersAlreadyExist = customers.some(
    (customers) => customers.cpf === cpf
  );
  if (customersAlreadyExist) {
    return response.status(404).json({ error: "Customer already exists!" });
  }
  // RN01 - END

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

// R02 -Deve ser possível buscar o extrato bancário do cliente;
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

// R03 - Deve ser possível realizar um depósito;
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);
  return response.status(201).send();
});

// R04 - Deve ser possível realizar um saque;
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;
  const balance = getBalance(customer.statement);
  // RN05 - Não Deve ser possível fazer saque quando o saldo foi insuficiente.
  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" });
  }
  // RN05 END
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };
  customer.statement.push(statementOperation);
  return response.status(201).send();
});

//R05 - Deve ser possível buscar o extrato bancário do cliente por data;
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;
  //Pegar qualquer horário do dia
  const dateFormat = new Date(date + " 00:00");
  //Somente o extrato bancário do dia
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

// R06 - Deve ser possível atualizar dados do cliente;
app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;
  customer.name = name;
  return response.status(201).send();
});

// R07 - Deve ser possível obter dados da conta do cliente;
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer);
});

// R08 - Deve ser possível deletar uma conta.
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  customers.splice(customer, 1);
  console.log(customers)
  return response.status(200).json(customers);
});

// R09 - Deve ser possível retornar o balance.
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement)
  return response.json(balance);
});

app.listen(3333, console.log("http://localhost:3333"));
