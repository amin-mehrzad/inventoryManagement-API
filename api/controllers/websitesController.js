const websiteModel = require('../models/websitesModel');
//const userModel = require('../models/usersModel');
module.exports = {
    getById: function (req, res, next) {
            websiteModel.findById(req.user.websiteID, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json( websiteInfo );
            });

    },
    getAll: function (req, res, next) {
            let websitesList = [];
            websiteModel.find({ _id: req.user.websiteID}, function (err, websites) {
                if (err)
                    next(err);
                else {
                    for (let website of websites) {
                        websitesList.push({
                            id: website._id,
                            websiteID: website.websiteID,
                            websiteName: website.websiteName,
                            logoURL: website.businessLogoUrl,
                            websitePlatform: website.websitePlatform,
                            websiteEmail: website.websiteEmail,
                            websiteEmailPassword: website.websiteEmailPassword,
                            websiteEmailService: website.websiteEmailService,
                            websiteURL: website.websiteURL
                        });
                    }
                    res.json({ status: "success", message: "Website list found!!!", data: { websites: websitesList } });
                }
            });

    },
    updateById: function (req, res, next) {
            websiteModel.findOneAndUpdate({_id:req.user.websiteID}, {
                //websiteID: req.body.websiteID,
                businessName: req.body.businessName,
              // businessLogoUrl: req.body.logoURL,
               businessPhone: req.body.businessPhone,
               businessEmail: req.body.businessEmail,
               businessAddress: req.body.businessAddress,
               country: req.body.country,
               state: req.body.state,
               phone: req.body.phone
            },{new:true}, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json(websiteInfo);
            });

    },
    deleteById: function (req, res, next) {
        if (req.user.websiteID == req.params.websiteId) {
            websiteModel.findByIdAndRemove(req.params.websiteId, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Website deleted successfully!!!", data: null });
            });
        } else {
            res.json({ status: "error", message: "Access Denied! You don't have access to change information of this website ", data: null });

        }
    },
    uploadImage: function (req, res, next) {
        console.log(req)
        websiteModel.findByIdAndUpdate( req.user.websiteID
        , {businessLogoUrl:req.file.filename}, { new: true },
         function (err, result) {
            if (err)
                next(err);
            else
                res.json( result );
        });
    }
}