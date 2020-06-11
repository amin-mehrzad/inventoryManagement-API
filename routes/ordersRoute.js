const express = require('express');
const router = express.Router();
const orderController = require('../api/controllers/ordersController');
var permission = require('express-jwt-permissions')();


router.get('/',  permission.check([['orders:read'],['admin']]), orderController.getAll);
router.post('/', permission.check([['orders:read', 'orders:write'],['admin']]), orderController.create);
router.get('/:orderId',  permission.check([['orders:read'],['admin']]), orderController.getById);
router.put('/:orderId', permission.check([['orders:read', 'orders:write'],['admin']]), orderController.updateById);
router.delete('/:orderId', permission.check([['orders:read', 'orders:write'],['admin']]), orderController.deleteById);
module.exports = router;