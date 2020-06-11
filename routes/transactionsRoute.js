const express = require('express');
const router = express.Router();
const transactionController = require('../api/controllers/transactionsController');
var permission = require('express-jwt-permissions')();

router.get('/',  permission.check([['transactions:read'],['admin']]), transactionController.getAll);
router.post('/', permission.check([['transactions:read', 'transactions:write'],['admin']]), transactionController.create);
router.get('/:transactionId',  permission.check([['transactions:read'],['admin']]), transactionController.getById);
router.put('/:transactionId', permission.check([['transactions:read', 'transactions:write'],['admin']]), transactionController.updateById);
router.delete('/:transactionId', permission.check([['transactions:read', 'transactions:write'],['admin']]), transactionController.deleteById);
module.exports = router;
