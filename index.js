const { compare } = require("./utils/compare");
const { sum, subtract, multiply, divide } = require("./utils/math");
const { getTodoCountFromUser } = require("./utils/todos");

const user = 2;

async function startApp() {
  console.log("");
  console.log("===============INICIO===============");
  console.log("");
  const todoCountFromUser = await getTodoCountFromUser(user);
  console.log(`Total de Tarefas do Usuário ${user}:`, todoCountFromUser);
  console.log("");
  console.log("================FIM=================");
  console.log("");
}

startApp();
