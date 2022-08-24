const axios = require("axios"); // $MOCK
const { getTodoCountFromUser } = require("./todos");

jest.mock("axios"); // $MOCK

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 2,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 2,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 2,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
];

const resp = {
  data: todos,
};

axios.get.mockImplementation(() => Promise.resolve(resp)); // $MOCK

describe("getTodoCountFromUser", () => {
  it("should return the correct todo count from user 1", async () => {
    const todoCountFromUser = await getTodoCountFromUser(1);
    expect(todoCountFromUser).toBe(1);
  });

  it("should return the correct todo count from user 2", async () => {
    const todoCountFromUser = await getTodoCountFromUser(2);
    expect(todoCountFromUser).toBe(3);
  });
});
