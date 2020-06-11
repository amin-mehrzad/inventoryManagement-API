const transactionModel = require('../models/transactionsModel');
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    transactionModel.findById(req.params.transactionId, function (err, transactionInfo) {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "Transactions found!!!", data: { transactions: transactionInfo } });
      }
    });
  },
  getAll: function (req, res, next) {
    let transactionsList = [];
    transactionModel.find({}, function (err, transactions) {
      if (err) {
        next(err);
      } else {
        for (let transaction of transactions) {
          transactionsList.push({
            id: transaction._id,
            name: transaction.name,
            email: transaction.email
          });
        }
        res.json({ status: "success", message: "Transactions list found!!!", data: { transactions: transactionsList } });
      }
    });
  },
  updateById: function (req, res, next) {
    transactionModel.findByIdAndUpdate(req.params.transactionId, {
      name: req.body.name,
      email: req.body.email
    }, function (err, transactionInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Transactions updated successfully!!!", data: null });
      }
    });
  },
  deleteById: function (req, res, next) {
    transactionModel.findByIdAndRemove(req.params.transactionId, function (err, transactionInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Transactions deleted successfully!!!", data: null });
      }
    });
  },
  create: function (req, res, next) {
    console.log(req.body)
    transactionModel.create({
      name: req.body.name,
      email: req.body.email
    }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Transactions added successfully!!!", data: result });
    });
  },
}