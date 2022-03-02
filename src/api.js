const express = require("express");
const { TransactionsData } = require("./transaction");
const apiRouter = express.Router();
const { Transaction } = require("./model/transactionModel");
const loggingMiddleware = (req, res, next) => {
  console.log(req.method, req.url);
  console.log("Body: >>>", req.body);
  next();
};

const enhanceReq = (req, res, next) => {
  if (req?.body?.amount) {
    req.userAmount = req?.body?.amount;
  }
  next();
};

apiRouter.use(loggingMiddleware);
apiRouter.use(enhanceReq);

apiRouter.get("/transactions", async (req, res) => {
  // const transactions = TransactionsData.getTransactions();
  // res.json({
  //   transactions,
  // });
  console.log(req.userId);
  console.log(req.query);
  const filter = req.query;
  const transactions = await Transaction.find(filter).exec();
  res.json({
    transactions,
  });
});

apiRouter.get("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findById(id).exec();
  res.json({
    transaction,
  });
});

apiRouter.post("/transaction", [enhanceReq], async (req, res) => {
  console.log("userAmount: >>>", req.userAmount);
  const data = req.body;
  const newTransaction = new Transaction(data);
  await newTransaction.save();
  //const newTransaction = TransactionsData.createTransaction(
  //  data.type,
  //  data.category,
  //  data.amount
  // );
  res.json({
    newTransaction,
  });
});

apiRouter.put("/transaction/:id", async (req, res) => {
  const newTransaction = req.body;
  // const updatedTransaction = TransactionsData.updateTransaction(
  //  req.params.index,
  //  transaction
  // );
  const updated = await Transaction.updateOne(
    { _id: req.params.id },
    newTransaction
  ).exec();
  // const response = await Transaction.findByIdAndUpdate(
  //  req.params.id,
  //  newTransaction
  // );
  res.json({
    updated,
  });
});

apiRouter.delete("/transaction/:id", async (req, res) => {
  const deleteResponse = await Transaction.deleteOne({ _id: req.params.id });
  //const response = TransactionsData.deleteTransaction(req.params.index);
  res.json({ deleteResponse });
});

apiRouter.get("/johntik", (req, res) => {
  res.send("API ROUTER: Hi John Tik");
});

module.exports = { apiRouter };
