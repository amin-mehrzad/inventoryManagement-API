// const express = require('express');
// const router = express.Router();
// const productController = require('../api/controllers/productsController');
// var permission = require('express-jwt-permissions')();

// var Crypto = require('crypto-js')
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//    // cb(null, new Date().toISOString() + file.originalname);
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

// router.get('/',  permission.check([['products:read'],['admin']]), productController.getAll);
// router.post('/', permission.check([['products:read', 'products:write'],['admin']]), upload.single('imageUrl'), productController.create);
// router.get('/:productId',  permission.check([['products:read'],['admin']]), productController.getById);
// router.put('/:productId', permission.check([['products:read', 'products:write'],['admin']]),upload.single('imageUrl'), productController.updateById);
// router.delete('/:productId', permission.check([['products:read', 'products:write'],['admin']]), productController.deleteById);
// module.exports = router;
