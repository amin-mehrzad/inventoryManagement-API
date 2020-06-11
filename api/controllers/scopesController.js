//const userModel = require('../models/users');
const scopeModel = require('../models/scopesModel');
module.exports = {
    getAll: function (req, res, next) {
        console.log('I m here')
        let permissionsList = [];
        scopeModel.find({}, function (err, permissions) {
            if (err) {
                next(err);
            } else {
                for (let userPermission of permissions) {
                    permissionsList.push({
                        userID: userPermission.userID,
                        permissions: userPermission.permissions
                    });
                }
                res.json({ status: "success", message: "User permission list found!!!", data: { permissions: permissionsList } });
            }
        });
    },
    getByUserID: function (req, res, next) {
        scopeModel.findOne({ userID: req.params.userId }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success", message: "User permissions found!!!", data: {
                        id: userInfo.userID,
                        permissions: userInfo.permissions
                    }
                });
            }
        });
    },
    updateByUserID: function (req, res, next) {
        console.log(req.body)
        scopeModel.findOneAndUpdate({ userID: req.params.userId }, { permissions: req.body.permissions }, function (err, scopeInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "User permissions updated successfully!!!", data: null });
            }
        });
    }
}