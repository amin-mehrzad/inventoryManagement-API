const customerModel = require('../models/customersModel');
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    customerModel.findById(req.params.customerId, function (err, customerInfo) {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "Customers found!!!", data: { customers: customerInfo } });
      }
    });
  },
  getAll: function (req, res, next) {
    let customersList = [];
    customerModel.find({}, function (err, customers) {
      if (err) {
        next(err);
      } else {
        for (let customer of customers) {
          customersList.push({
            id: customer._id,
            name: customer.name,
            email: customer.email
          });
        }
        res.json({ status: "success", message: "Customers list found!!!", data: { customers: customersList } });
      }
    });
  },
  updateById: function (req, res, next) {
    customerModel.findByIdAndUpdate(req.params.customerId, {
      name: req.body.name,
      email: req.body.email
    }, function (err, customerInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Customers updated successfully!!!", data: null });
      }
    });
  },
  deleteById: function (req, res, next) {
    customerModel.findByIdAndRemove(req.params.customerId, function (err, customerInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Customers deleted successfully!!!", data: null });
      }
    });
  },
  create: function (req, res, next) {
    console.log(req.body)
    customerModel.create({
      name: req.body.name,
      email: req.body.email
    }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Customers added successfully!!!", data: result });
    });
  },
}