const categoryModel = require('../models/categoriesModel');
var mongoose = require('mongoose');



module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        categoryModel.findById(req.params.categoryId, function (err, categoryInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "category found!!!", data: { categories: categoryInfo } });
        });
    },
    getAll: function (req, res, next) {
        var webID = mongoose.Types.ObjectId(req.user.websiteID);
        categoryModel.aggregate(
            [
                {
                    $match: {
                        websiteID: webID,
                    }
                },
                {
                    $project: {
                        categoryName: 1,
                        categoryDescription: 1,
                        sortOrder: 1

                    }
                }

            ], function (err, categories) {
                if (err)
                    next(err);
                else
                    res.status(200).json({ status: "success", message: "Category list found!!!", data: categories });
            }
        )
    },
    updateById: function (req, res, next) {

        cModel = {
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            sortOrder: req.body.sortOrder,

        }
        categoryModel.findOneAndUpdate({
            _id: req.params.categoryId,
            websiteID: req.user.websiteID
        }, cModel, { new: true }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
    deleteById: function (req, res, next) {
        categoryModel.findByIdAndRemove(req.params.categoryId, function (err, categoryInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "category deleted successfully!!!", data: null });
        });
    },
    create: function (req, res, next) {
        console.log(req)
        categoryModel.create({
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            sortOrder: req.body.sortOrder,

            websiteID: req.user.websiteID

        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
}