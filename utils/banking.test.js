const { Bank } = require("./banking");

const accountMock = {
  id: "cris",
  name: "Cristian Macedo",
  password: "123",
};

describe("banking", () => {
  test("deposit on account should change account balance correctly", () => {
    const bank = new Bank("Bradesco");
    bank.createAccount(
      accountMock.id,
      0,
      accountMock.name,
      accountMock.password
    );

    bank.deposit(accountMock.id, 50);
    bank.deposit(accountMock.id, 20);

    expect(bank.balance(accountMock.id)).toBe(70);
  });
});
