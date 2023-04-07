class Bank {
  name;
  log;

  accounts = [];
  events = [];

  constructor(name, log = false) {
    this.name = name;
    this.log = log;
  }

  createAccount(id, initialBalance, name, password) {
    if (this.log)
      console.log(
        `CREATING ACCOUNT FOR '${name}' (${id}) WITH INITIAL BALANCE OF $${initialBalance}`
      );
    this.accounts.push({
      id,
      name,
      password,
      balance: initialBalance,
    });
    this.events.push({ type: "create", balance: initialBalance, account: id });
  }

  deposit(account, amount) {
    if (this.log) console.log(`DEPOSITING $${amount} IN ${account}`);
    this.events.push({ type: "deposit", amount, account });
    this.accounts.find((acc) => acc.id === account).balance += amount;
  }

  withdraw(account, amount) {
    if (this.log) console.log(`WITHDRAWING $${amount} OF ${account}`);
    this.events.push({ type: "withdraw", amount, account });
    this.accounts.find((acc) => acc.id === account).balance -= amount;
  }

  balance(account) {
    const { balance } = this.accounts.find((acc) => acc.id === account);
    if (this.log) console.log(`BALANCE OF ${account}: $${balance}`);
    return balance;
  }

  transfer(accountFrom, accountTo, amount) {
    if (this.log)
      console.log(`TRANSFERING $${amount} FROM ${accountFrom} TO ${accountTo}`);
    this.events.push({
      type: "transfer",
      from: accountFrom,
      to: accountTo,
      amount,
    });
    this.accounts.find((acc) => acc.id === accountFrom).balance -= amount;
    this.accounts.find((acc) => acc.id === accountTo).balance += amount;
  }

  audit() {
    const eventSourcedStateMap = events.reduce((accounts, event) => {
      if (event.type === "create") {
        accounts[event.account] = {
          id: event.account,
          balance: event.balance,
        };
      } else if (event.type === "deposit") {
        accounts[event.account].balance += event.amount;
      } else if (event.type === "withdraw") {
        accounts[event.account].balance -= event.amount;
      } else if (event.type === "transfer") {
        accounts[event.from].balance -= event.amount;
        accounts[event.to].balance += event.amount;
      }

      return accounts;
    }, {});

    const eventSourcedAccountStates = Object.values(eventSourcedStateMap);

    for (const accountState of eventSourcedAccountStates) {
      const actualAccount = this.accounts.find((a) => a.id === accountState.id);
      if (!actualAccount) throw new Error("Account not found");
      if (actualAccount.balance !== accountState.balance) return false;
    }

    if (this.log)
      console.log(`AUDIT RESULT: ${Object.values(eventSourcedStateMap)}`);

    return true;
  }
}

module.exports = {
  Bank,
};
