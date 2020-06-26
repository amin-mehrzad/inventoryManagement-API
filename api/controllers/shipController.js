const shipmentModel = require('../models/shipmentsModel');
const orderModel = require('../models/ordersModel');
const processShippment = require('./processControllers/processShipment')
const processOrder = require('./processControllers/processOrder')
var mongoose = require('mongoose');

const axios = require('axios');
require('dotenv').config();
const shipStationKey = process.env.SHIP_STATION_KEY;
const shipStationSecret = process.env.SHIP_STATION_SECRET;

const url = require('url')
const querystring = require('querystring')


module.exports = {

    create: function (req, res, next) {

        console.log(req.body)
        var pullRequestURL = req.body.resource_url
        // var urlObject = url.parse(pullRequestURL, true)

        // querystring.parse(urlObject)
        // console.log(urlObject.query)

        var modifiedURL = pullRequestURL.replace('False', 'True')

        // console.log(querystring.parse(urlObject))
        //   urlObject = 

        axios.get(modifiedURL, {
            auth: {
                username: shipStationKey,
                password: shipStationSecret
            }
        })
            .then((response) => {
                console.log('response from ship station, total shipments :', response.data.total)
                var shipments = response.data.shipments
                // console.log(response)
                shipments.map((shipment) => {
                    console.log('shipments[i]')
                    orderModel.find({ orderId: shipment.orderId }, (err, orderResult) => {
                        console.log(`=====..${orderResult.length}..==== orderResult found`)
                        if (err)
                            next(err)
                        else if (orderResult.length > 0) {
                            shipmentModel.create(shipment, (err, newShipment) => {
                                if (err)
                                    next(err)
                                else {
                                    console.log('---------------->',)
                                    processShippment.updateProducts(shipment)
                                    console.log('new shipment created-------->', newShipment.shipmentId)
                                }
                            })
                        } else {
                            console.log('=====..xxxxxxxxxx..==== orderResult  not  found')
                            axios.get(`http://ssapi.shipstation.com/orders/${shipment.orderId}`, {
                                auth: {
                                    username: shipStationKey,
                                    password: shipStationSecret
                                }
                            })
                                .then(async (orderResponse) => {
                                    console.log('=====..xxxxxlllxxxxx..==== orderdownloaded')

                                    orderModel.create(orderResponse.data, async (err, newOrder) => {

                                        await processOrder.updateProducts(orderResponse.data)


                                        console.log('<<<<=====..xxxxxlllxxxxx..====>>>>>>  order Processed')


                                        await processShippment.updateProducts(shipment)

                                        console.log('new shipment created--->----->', shipment.shipmentId)


                                    })

                                })

                        }

                    })
                })

                res.status(200).json({ message: 'success' })


            })
            .catch((error) => {
                console.log(error)
            })
    }
}

