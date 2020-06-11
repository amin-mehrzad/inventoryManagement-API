const OrderModel = require('../models/ordersModel');
var mongoose = require('mongoose');

module.exports = {
    getById: function (req, res, next) {
        //  console.log(req.io.sockets.emit('FromAPI'));
        OrderModel.findById(req.params.orderId, function (err, OrderInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Order found!!!", data: { orders: OrderInfo } });
        });
    },
    getAll: function (req, res, next) {
        var webID = mongoose.Types.ObjectId(req.user.websiteID);
        OrderModel.aggregate(
            [
                {
                    $match: {
                        websiteID: webID,
                    }
                },
                {
                    $project: {
                        orderID: 1,
                        orderNumber: 1,
                        orderItems: 1,
                        orderStatusHistory: 1,
                        orderState: 1,
                        orderSubTotal: 1,
                        orderTax: 1,
                        orderDeliveryFee: 1,
                        orderTip: 1,
                        orderType: 1,
                        orderPaymentType: 1,
                        orderPaymentDetails: 1,
                        orderDiscount: 1,
                        orderDiscountDetails: 1,
                        customerID: 1,
                        customerFirstName: 1,
                        customerLastName: 1,
                        customerPhoneNumber: 1,
                        customerEmail: 1,
                        orderInstructions: 1,
                        orderPaymentInstructions: 1,
                        orderCreatedTime: 1,
                        websiteID: 1

                    }
                },
                {
                    $sort: {
                        orderCreatedTime: -1,
                    }
                },

            ], function (err, categories) {
                if (err)
                    next(err);
                else
                    res.status(200).json({ status: "success", message: "Order list found!!!", data: categories });
            }
        )
    },
    updateById: function (req, res, next) {

        oModel = req.body
        OrderModel.findOneAndUpdate({
            _id: req.params.orderId,
            websiteID: req.user.websiteID
        }, oModel, { new: true }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
    deleteById: function (req, res, next) {
        OrderModel.findByIdAndRemove(req.params.orderId, function (err, OrderInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Order deleted successfully!!!", data: null });
        });
    },
    // create: function (req, res, next) {

    //     var oModel=req.body
    //     var orderCreatedTime = new Date()
    //     oModel={...oModel,websiteID: req.user.websiteID, orderCreatedTime: orderCreatedTime}
    //     console.log(oModel)
    //     OrderModel.create(oModel, function (err, result) {
    //         if (err)
    //             next(err);
    //         else{

    //             req.io.sockets.emit('NewOrder',result)
    //             res.json({result}).status(200);
    //         }
    //     });
    // },
    create: function (req, res, next) {
        console.log(req.user.websiteID)
        var newEmailUID = `${Date.now()}-${Math.floor(Math.random() * Math.pow(10, 8))}`;
        var orderData = req.body;
        orderData = {
            ...orderData,
            websiteID: req.user.websiteID,
            // billingAddress : req.body.billingAddress,
            // shippingAddress : req.body.shippingAddress,
            updateTimeStamp: Date.now()
        };
        console.log(orderData)

        // orderData.websiteID = req.user.websiteID;
        // orderData.billingAddress = req.body.billingData;
        // orderData.shippingAddress = req.body.shippingData;
        // orderData.updateTimeStamp = moment();



        OrderModel.findOneAndUpdate({ websiteID: req.user.websiteID, entity_id: orderData.entity_id }, orderData, { upsert: true, new: true },
            function (err, orderObject) {
                if (err) {
                    console.log(err);
                } else if (orderObject) {

                    var orderSkus = Object.keys(req.body.itemsData);
                    var reviewItemData = req.body.itemsData[orderSkus[0]];

                    pModel = {
                        websiteID: req.user.websiteID,
                        productID: reviewItemData.productID,
                        productSKU: reviewItemData.productSKU,
                        productName: reviewItemData.productName,
                        productImage: reviewItemData.productImageURL,
                        productURL: reviewItemData.productURL,
                        productMSRP: reviewItemData.productMSRP,
                        productMSWP: reviewItemData.productMSWP,
                        productPrice: reviewItemData.productPrice,
                        productQty: reviewItemData.productQty,
                        productSalableQty: reviewItemData.productSalableQty,
                        productInStock: reviewItemData.productInStock,
                        productCategory: reviewItemData.productCategory,
                        productStatus: reviewItemData.productStatus,
                        email: orderObject.billingAddress.email,
                        firstName: orderObject.billingAddress.firstName,
                        lastName: orderObject.billingAddress.lastname,
                        customerID: orderObject.customer_id,

                        updateTimeStamp: orderObject.updateTimeStamp,


                    };

                }
                else {
                    console.log('check here ----1')
                }
                console.log("finished - sending response");
                res.status(200).json({ status: "success", message: "Order and Email added successfully!!!", data: orderObject });
            })

    }
}