const axios = require("axios");

// Pegar to-do's apenas do usuário especificado no parametro id
const getTodoCountFromUser = async (id) => {
  // Dados externos e incontroláveis
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos = response.data;
  const todosFromUser = todos.filter((todo) => todo.userId === id);
  return todosFromUser.length;
};

module.exports = { getTodoCountFromUser };
