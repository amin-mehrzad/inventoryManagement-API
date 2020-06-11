const express = require('express');
const router = express.Router();
const websiteController = require('../api/controllers/websitesController');
var permission = require('express-jwt-permissions')();

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/businessLogos/');
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


 router.get('/',  permission.check([['websites:read'],['admin']]), websiteController.getAll);
//router.post('/', permission.check([['websites:read', 'websites:write'],['admin']]), upload.single('businessLogoUrl'), websiteController.uploadImage);
 router.get('/:websiteId',  permission.check([['websites:read'],['admin']]), websiteController.getById);
//router.get('/',  permission.check([['websites:read'],['admin']]), websiteController.getById);
// router.put('/:websiteId', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.updateById);
router.put('/', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.updateById);
router.delete('/:websiteId', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.deleteById);
module.exports = router;
