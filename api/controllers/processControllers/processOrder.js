const productsModel = require("../../models/productsModel")
//const customerModel = require("../../models/customerModel")


module.exports = {
    updateCustomer: (orderInfo) => {
        customerModel.findAndUpdate({ customerEmail: orderInfo.customer_email }, orderInfo.billingAddress, { upsert: true }, () => { })
        // TODO: return success status
    },
    updateProducts: (orderInfo) => {
        console.log(orderInfo)

        items = orderInfo.items
      //  console.log(items)
        items.map((item) => {
            productsModel.findOneAndUpdate({ productSKU: item.sku },{},{upsert:true,new:true}, (err, product) => {
                if (err)
                    next(err)
                else if (product.productQty) {
                    console.log('update quantity' ,product)
                    product.productQty = product.productQty - item.quantity
                    product.save()
                //    .then(()=>{return true})

                } else {
                   // const newProduct = new productsModel
                   console.log('insert quantity' ,product)
                    product.productQty = 0 - item.quantity
                    product.save()
                  //  .then(()=>{return true})
                }

            })
        })
    },
}