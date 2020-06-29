const shipmentModel = require('../models/shipmentsModel');
const orderModel = require('../models/ordersModel');
const processShippment = require('./processControllers/processShipment')
const processOrder = require('./processControllers/processOrder')
var mongoose = require('mongoose');

const axios = require('axios');
require('dotenv').config();
const shipStationKey = process.env.SHIP_STATION_KEY;
const shipStationSecret = process.env.SHIP_STATION_SECRET;

const authorization = {
    auth: {
        username: shipStationKey,
        password: shipStationSecret
    }
}
const url = require('url')
const querystring = require('querystring')


module.exports = {

    create: function (req, res, next) {

        console.log(req.body)

        var pullRequestURL = req.body.resource_url
        var modifiedURL = pullRequestURL.replace('False', 'True')

        axios.get(modifiedURL, authorization)
            .then((response) => {

                console.log('response from ship station, total shipments :', response.data.total)
                var shipments = response.data.shipments

                shipments.map((shipment) => {
                    console.log('shipments[i]')

                    processShippment.updateProducts(shipment) //update qty
                    shipmentModel.create(shipment, (err, newShipment) => {
                        if (err)
                            next(err)
                        else {
                            // console.log('---------------->')
                            ////////processShippment.updateProducts(shipment) //update qty
                            console.log('new shipment created-------->', newShipment.shipmentId)

                            // if (shipment.advancedOptions.mergedOrSplit) 
                            // // if it not splited order : 
                            // {
                            //     axios.get(`http://ssapi.shipstation.com/orders/${shipment.advancedOptions.parentId}`, {
                            //                 auth: {
                            //                     username: shipStationKey,
                            //                     password: shipStationSecret
                            //                 }
                            //             })
                            //             .then((parentOrder)=>{

                            //             })
                            // }


                        }
                    })

                    orderModel.find({ orderId: shipment.orderId }, (err, orderResult) => {

                        if (err)
                            next(err)
                        else if (orderResult.length > 0) {
                            /* if orderID  exists */
                            console.log(`=====..${orderResult.length}..==== orderResult found in DB`)

                            processShippment.updateProducts(shipment) // update qty (physical qty)

                        } else {
                            /* If orderID  doesn't exist */
                            console.log('=====..xxxxxxxxxx..==== orderResult not found in DB')

                            axios.get(`http://ssapi.shipstation.com/orders/${shipment.orderId}`, authorization)
                                .then(async (orderResponse) => {
                                    console.log(`=====..xxxxxlllxxxxx..==== order ${shipment.orderId} lodaded from shipstation`)

                                    if (orderResponse.data.advancedOptions.mergedOrSplit) {
                                        /*  If it is a splited order: */
                                        orderModel.create({ ...orderResponse.data, isActivated: true }, async (err, newOrder) => {

                                            //await processOrder.updateProducts(orderResponse.data) //update available qty
                                            console.log('<<<<=====..xxxxxlllxxxxx..====>>>>>>  order Processed')
                                            //await processShippment.updateProducts(shipment) // update qty (physical qty)

                                            axios.get(`http://ssapi.shipstation.com/orders/${orderResponse.data.advancedOptions.parentId}`, authorization)
                                                .then((parentOrder) => {
                                                    orderModel.findOneAndUpdate({ orderId: parentOrder.orderId }, { parentOrder, isActivated: false }, { upsert: true, new: true }, (err, newParentOrder) => {
                                                        if (err)
                                                            next(err)
                                                        else {
                                                            console.log('<<==.xxxlxxx.==>>  parent order Created')

                                                        }
                                                    })
                                                })
                                        })
                                    } else {
                                        /*  If it is NOT a splited order: */
                                        console.log('<<<<=====..xxxxxlxxxxx..====>>>>>>  order is NOT a splited order:')
                                        orderModel.create({ ...orderResponse.data, isActivated: true }, async (err, newOrder) => {
                                            console.log(`=====..xxxxxlllxxxxx..==== order ${newOrder.orderId} added`)
                                            // await processOrder.updateProducts(orderResponse.data)
                                            // console.log('<<<<=====..xxxxxlllxxxxx..====>>>>>>  order Processed')
                                            // await processShippment.updateProducts(shipment)
                                        })
                                    }
                                })

                        }

                    })
                    // else  // if it is splited order :
                    // {

                    //     orderModel.findOneAndUpdate({ orderId: shipment.orderId },{isActivated:false}, (err, newOrder) => {})

                    //     axios.get(`http://ssapi.shipstation.com/orders/${shipment.advancedOptions.parentId}`, {
                    //         auth: {
                    //             username: shipStationKey,
                    //             password: shipStationSecret
                    //         }
                    //     })
                    //         .then((parentOrderResponse) => {
                    //             console.log('=====..xxxxxlllxxxxx..==== Parent order loaded')

                    //             // orderModel.create(parentOrderResponse.data, async (err, newOrder) => {
                    //             //     await processOrder.updateProducts(parentOrderResponse.data)
                    //             //     console.log('<<<<=====..xxxxxlllxxxxx..====>>>>>>  order Processed')
                    //             //     await processShippment.updateProducts(shipment)
                    //             //     console.log('new shipment created--->----->', shipment.shipmentId)
                    //             // })

                    //             orderModel.find({ orderId: parentOrderResponse.data.orderId }, (err, newOrder) => {
                    //                 if (err)
                    //                     next(err)
                    //                 else if (newOrder.length > 0) {
                    //                     newOrder.isActivated = false
                    //                     newOrder.save()
                    //                 } else {
                    //                     newOrder = { ...newOrder, isActivated: false }
                    //                     newOrder.save()

                    //                 }
                    //             })


                    //         })
                    //     }

                })

                res.status(200).json({ message: 'success' })


            })
            .catch((error) => {
                console.log(error)
            })
    }
}

