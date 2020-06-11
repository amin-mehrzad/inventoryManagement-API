const userModel = require('../models/usersModel');
//const refreshTokenModel = require('../models/refreshTokens');
const scopeModel = require('../models/scopesModel');
const websiteModel = require('../models/websitesModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    create: function (req, res, next) {
        console.log(req.body)
        encryptedPass = bcrypt.hashSync(req.body.password, saltRounds);
        userModel.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: encryptedPass }, function (err, result) {
            if (err)
                next(err);
            else {
                console.log(result._id)
                // scopeModel.create({ userID: result._id, permissions: ["users:read", "products:read", "scopes:read", "users:write", "products:write", "scopes:write"] }, function (error, doc) {
                scopeModel.create({ userID: result._id, permissions: ["admin"] }, function (error, doc) {
                    if (error)
                        next(error);
                    else {
                        websiteModel.create({ scopeID: doc._id }, (websiteError, websiteDoc) => {
                            result.websiteID = websiteDoc._id;
                            result.save();
                        })
                    }
                });
                res.json({ status: "success", message: "User added successfully!!!", data: null });
            }
        });
    },
    authenticate: function (req, res, next) {
        //  console.log(req);

        userModel.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') })
            .populate({ path: 'websiteID', populate: { path: 'scopeID', model: 'Scopes' } })
            .exec(function (joinErr, userInfo) {
                if (joinErr) {
                    next(joinErr);
                } else {
                    if (userInfo != null) {
                        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                            console.log(userInfo);
                            const token = jwt.sign({
                                id: userInfo._id,
                                permissions: userInfo.websiteID.scopeID.permissions,
                                websiteID: userInfo.websiteID._id
                            }, req.app.get('secretKey'), { expiresIn: 8640000 });
                            const refreshToken = jwt.sign({
                                id: userInfo._id,
                                permissions: userInfo.websiteID.scopeID.permissions,
                                websiteID: userInfo.websiteID._id
                            }, req.app.get('refreshTokenSecretKey'), { expiresIn: 8640000 });
                            res.json({ status: "success", message: "user found!!!", data: { user: userInfo.email, firstName: userInfo.firstName, lastName: userInfo.lastName, token: token, refreshToken: refreshToken } });
                        } else {
                            res.status(401).json({ passwordincorrect: true, password: ['Password not found'] });
                            // res.status(401).json({ passwordincorrect:true ,password:'Password not found'});
                        }
                    } else {
                        res.status(401).json({ email: ['Email not found'], emailnotfound: true });
                        // res.status(401).json({ email:'Email not found' ,emailnotfound:true } );
                    }
                }
            });
    },
    refreshToken: function (req, res, next) {
        // userModel.findOne({ 'tokens.refreshToken' : req.body.refreshToken }, function (err, tokenInfo) {
        //    userModel.findOne({ refreshTokens: req.body.refreshToken}  , function (err, tokenInfo) {
        console.log(req.body)
        //   if (err) { next(err); }
        // if (tokenInfo) {
        jwt.verify(req.body.refreshToken, req.app.get('refreshTokenSecretKey'), function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });
            } else {
                // refreshTokenModel.insert({ refreshTokens: req.body.refreshToken})
                // add user id to request
                // req.body.userId = decoded.id;
                // const expireDate = Date(0);
                //   expireDate.setUTCSeconds(token.data.exp);
                // const date = new Date(0);

                //console.log(date.setUTCSeconds(decoded.exp))
                //  console.log(date.setUTCSeconds(decoded.iat))
                console.log(new Date(decoded.exp * 1000))
                console.log(new Date(decoded.iat * 1000))
                console.log(decoded.permissions)
                const token = jwt.sign({ id: decoded.id, permissions: decoded.permissions }, req.app.get('secretKey'), { expiresIn: 8640000 });
                // tokenInfo.tokens.token=token;
                res.json({ status: "success", message: "token refreshed!!!", data: { token: token } });
                //   next();
            }
        });

        ///    }  else {
        //  res.json({ status: "error", message: "token is wrong", data: null });
        //       }
        //    });
    },
    usersList: function (req, res, next) {
        let usersList = [];
        userModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let user of users) {
                    usersList.push({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    });
                }
                res.json({ status: "success", message: "Users list found!!!", data: { users: usersList } });
            }
        });
    },
    user: function (req, res, next) {
        console.log(req)
        userModel.findById(req.user.id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    id: userInfo._id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,

                    email: userInfo.email
                });
            }
        });
    },
    deleteUser: (req, res, next) => {
        userModel.findByIdAndRemove(req.params.userId, (error, userInfo) => {
            if (error) {
                next(error);
            } else {
                scopeModel.findOneAndRemove({ userID: req.params.userId }, (err, scopeInfo) => {
                    res.json({ status: "success", message: "The user account deleted successfully!!!", data: null });
                })
            }
        })
    },
    editUser: (req, res, next) => {
        userModel.findByIdAndUpdate( req.user.id , {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, { new: true }, (error,editedData) => {
            if (error)
                next(error)
            else {
                res.status(200).json({
                    firstName: editedData.firstName,
                    lastName: editedData.lastName,
                    email: editedData.email
                })
            }
        })
    }
    // permission: function (req,res,next) {
    //     console.log(req)

    //    // let permissionsList = [];
    //     // scopeModel.find({}, function (err, permissions) {
    //     //     if (err) {
    //     //         next(err);
    //     //     } else {
    //     //         for (let userPermission of permissions) {

    //     //             permissionsList.push({
    //     //                 id: userPermission._id,
    //     //                 userID: userPermission.userID,
    //     //               //  permissions: userPermission.permissions
    //     //             });
    //     //         }
    //     //         res.json({ status: "success", message: "User permission list found!!!", data: { permissions: permissionsList } });
    //     //     }
    //     // });
    // },
    // test: function (req, res, next) {
    // console.log(req.params)
    // }
}