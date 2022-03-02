class Transactions {
  transactions = [];

  constructor() {
    this.transactions = [
      {
        type: "income",
        categories: "salary",
        amount: 27500,
      },
      {
        type: "expense",
        categories: "shopping",
        amount: -1500,
      },
    ];
  }

  getTransactions() {
    return this.transactions;
  }

  getTransaction(index) {
    return this.transactions[index];
  }

  createTransaction(type, category, amount) {
    const newTransaction = {
      type,
      category,
      amount,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  updateTransaction(index, transaction) {
    this.transactions[index] = transaction;
    return this.transactions[index];
  }

  deleteTransaction(deleteIndex) {
    this.transactions = this.transactions.filter(
      (data, index) => index !== Number(deleteIndex)
    );
    return true;
  }
}

const TransactionsData = new Transactions();

module.exports = {
  TransactionsData,
};
