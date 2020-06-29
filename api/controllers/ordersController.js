const OrderModel = require('../models/ordersModel');
const processOrder = require('../controllers/processControllers/processOrder')
var mongoose = require('mongoose');

const axios = require('axios');
require('dotenv').config();
const shipStationKey = process.env.SHIP_STATION_KEY;
const shipStationSecret = process.env.SHIP_STATION_SECRET;



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
    create: function (req, res, next) {       
        console.log(req.body)
        pullRequestURL = req.body.resource_url
        axios.get(pullRequestURL, {
            auth: {
                username: shipStationKey,
                password: shipStationSecret
            }
        })
            .then((response) => {
                console.log('response from ship station, total orders :', response.data.total)
                var orders = response.data.orders
                orders.map((order) => {
                    OrderModel.create({...order, isActivated: true}, (err, newOrder) => {
                        if (err)
                            next(err)
                        else {
                            console.log('---------------->')
                            processOrder.updateProducts(order)
                            processOrder.updateNotShippedOrders(newOrder)
                            console.log('new order created in DB-------->', newOrder.orderNumber)
                        }
                    })
                })
                res.status(200).json({message:'success'})
            })
            .catch((error) => {
                console.log(error)
            })
    }
}