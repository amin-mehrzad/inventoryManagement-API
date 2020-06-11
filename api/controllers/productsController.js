const productModel = require('../models/productsModel');
var mongoose = require('mongoose');



module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        productModel.findById(req.params.productId, function (err, productInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Product found!!!", data: { products: productInfo } });
        });
    },
    getAll: function (req, res, next) {
        var webID = mongoose.Types.ObjectId(req.user.websiteID);
        productModel.aggregate(
            [
                {
                    $match: {
                        websiteID: webID,
                    }
                },
                {
                    $project: {
                        _id: 1,
                        imageUrl: 1,
                        name: 1,
                        price: 1,
                        qty: 1,
                        tax: 1,
                        featured: 1,
                        category: 1,
                        barcode: 1,
                        active: 1
                    }
                }

            ], function (err, products) {
                if (err)
                    next(err);
                else
                    res.status(200).json({ status: "success", message: "Review list found!!!", data: products });
            }
        )
    },
    updateById: function (req, res, next) {
        if (req.file)
            var imageUrl = req.file.filename
        else
            var imageUrl = req.body.imageUrl


        pModel = {
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            tax: req.body.tax,
           // imageUrl: req.body.imageUrl,
            featured: req.body.featured,
            barcode: req.body.barcode,
            category: req.body.category,
            active: req.body.active,

            imageUrl: imageUrl

        }
        productModel.findOneAndUpdate({
            _id: req.params.productId,
            websiteID: req.user.websiteID
        }, pModel, { new: true }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
    deleteById: function (req, res, next) {
        productModel.findByIdAndRemove(req.params.productId, function (err, productInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Product deleted successfully!!!", data: null });
        });
    },
    create: function (req, res, next) {
        console.log(req)
        productModel.create({
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            tax: req.body.tax,
            featured: req.body.featured,
            barcode: req.body.barcode,
            category: req.body.category,
            active: req.body.active,

            imageUrl:     req.file ? req.file.filename : "1x1.png" ,

            websiteID: req.user.websiteID

        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
}