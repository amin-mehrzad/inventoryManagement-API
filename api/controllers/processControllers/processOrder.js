const productsModel = require("../../models/productsModel")
//const customerModel = require("../../models/customerModel")


module.exports = {
    updateCustomer: (orderInfo) => {
        customerModel.findAndUpdate({ customerEmail: orderInfo.customer_email }, orderInfo.billingAddress, { upsert: true }, () => { })
        // TODO: return success status
    },
    updateProducts: (orderInfo) => {
        console.log('updating products of order Number:',orderInfo.orderNumber)

        items = orderInfo.items
      //  console.log(items)
        items.map( (item) => {
            productsModel.findOneAndUpdate({ productSKU: item.sku },{},{upsert:true,new:true}, (err, product) => {
                if (err)
                    next(err)
                else if (product.productAvailableQty) {
                    console.log('update quantity' ,product)
                    product.productAvailableQty = product.productAvailableQty - item.quantity
                    product.save()
                //    .then(()=>{return true})

                } else {
                   // const newProduct = new productsModel
                   console.log('insert quantity' ,product)
                    product.productAvailableQty = 0 - item.quantity
                    product.save()
                  //  .then(()=>{return true})
                }

            })
            console.log('sku:',item.sku)
        })
    },
}