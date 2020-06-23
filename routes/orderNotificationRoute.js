const express = require('express');
const router = express.Router();
const orderController = require('../api/controllers/ordersController');
// var permission = require('express-jwt-permissions')();


router.get('/', orderController.getAll);
router.post('/', orderController.create);
router.get('/:orderId',  orderController.getById);
router.put('/:orderId', orderController.updateById);
router.delete('/:orderId', orderController.deleteById);
module.exports = router;