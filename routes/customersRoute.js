const express = require('express');
const router = express.Router();
const customerController = require('../api/controllers/customersController');
var permission = require('express-jwt-permissions')();

router.get('/',  permission.check([['customers:read'],['admin']]), customerController.getAll);
router.post('/', permission.check([['customers:read', 'customers:write'],['admin']]), customerController.create);
router.get('/:customerId',  permission.check([['customers:read'],['admin']]), customerController.getById);
router.put('/:customerId', permission.check([['customers:read', 'customers:write'],['admin']]), customerController.updateById);
router.delete('/:customerId', permission.check([['customers:read', 'customers:write'],['admin']]), customerController.deleteById);
module.exports = router;
