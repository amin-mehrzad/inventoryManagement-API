const express = require('express');
const router = express.Router();
const categoryController = require('../api/controllers/categoriesController');
var permission = require('express-jwt-permissions')();


router.get('/',  permission.check([['categories:read'],['admin']]), categoryController.getAll);
router.post('/', permission.check([['categories:read', 'categories:write'],['admin']]), categoryController.create);
router.get('/:categoryId',  permission.check([['categories:read'],['admin']]), categoryController.getById);
router.put('/:categoryId', permission.check([['categories:read', 'categories:write'],['admin']]), categoryController.updateById);
router.delete('/:categoryId', permission.check([['categories:read', 'categories:write'],['admin']]), categoryController.deleteById);
module.exports = router;
