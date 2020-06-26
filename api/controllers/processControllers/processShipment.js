const productsModel = require("../../models/productsModel")
//const customerModel = require("../../models/customerModel")


module.exports = {
    updateCustomer: (shipmentInfo) => {
        customerModel.findAndUpdate({ customerEmail: shipmentInfo.customer_email }, shipmentInfo.billingAddress, { upsert: true }, () => { })
        // TODO: change customer information from shipping  info
    },
    updateProducts: async (shipmentInfo) => {
        console.log('updating products of order Number:',shipmentInfo.orderNumber)

        items = shipmentInfo.shipmentItems
      //  console.log(items)
       await items.map( (item) => {
            productsModel.findOneAndUpdate({ productSKU: item.sku },{},{upsert:true,new:true}, (err, product) => {
                if (err)
                    next(err)
                else if (product.productSKU) {
                    console.log('update quantity', product)
                    product.productQty = product.productQty - item.quantity
                    product.save()
                //    .then(()=>{return true})

                } else {
                   // const newProduct = new productsModel
                   console.log('insert quantity', product)
                    product.productQty = 0 - item.quantity
                    product.save()
                  //  .then(()=>{return true})
                }

            })
            console.log('sku:', item.sku)
        })
    },
}