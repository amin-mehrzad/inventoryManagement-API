const express = require('express');
const router = express.Router();
const shipController = require('../api/controllers/shipController');
// var permission = require('express-jwt-permissions')();


// router.get('/', shipController.getAll);
router.post('/', shipController.create);
// router.get('/:shipId',  shipController.getById);
// router.put('/:shipId', shipController.updateById);
// router.delete('/:shipId', shipController.deleteById);
module.exports = router;