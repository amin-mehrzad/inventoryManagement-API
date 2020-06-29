const productsModel = require("../../models/productsModel")
const notShippedOrderModel = require("../../models/notShippedOrdersModel")
//const customerModel = require("../../models/customerModel")


module.exports = {
    updateCustomer: (orderInfo) => {
        customerModel.findAndUpdate({ customerEmail: orderInfo.customer_email }, orderInfo.billingAddress, { upsert: true }, () => { })
        // TODO: return success status
    },
    updateProducts: async (orderInfo) => {
      //console.log('updating products of order Number:',orderInfo)

        console.log('updating products of order Number:',orderInfo.orderNumber)

        items = orderInfo.items
      //  console.log(items)
      await items.map( async (item) => {
           await productsModel.findOneAndUpdate({ productSKU: item.sku },{},{upsert:true,new:true}, (err, product) => {
                if (err)
                    next(err)
                else if (product.productAvailableQty) {
                    console.log('update quantity' ,product)
                    console.log('product quantity updated for sku ',product.productSKU)
                    product.productAvailableQty = product.productAvailableQty - item.quantity
                    product.save()
                   // .then(()=>{return true})

                } else {
                   // const newProduct = new productsModel
                  // console.log('insert quantity' ,product)
                   console.log('product quantity inserted for sku ',product.productSKU)
                    product.productAvailableQty = 0 - item.quantity
                    product.save()
                  //  .then(()=>{return true})
                }

            })
            console.log('sku:',item.sku)
        })
      //  return 'DONE'
    },
    updateNotShippedOrders:  (orderInfo) => {
        //console.log('updating products of order Number:',orderInfo)
  
          console.log('updating order list for order Number:', orderInfo.orderNumber)
  
         // items = orderInfo.items
            //  console.log(items)
            //  await items.map( (item) => {

            // TODO  complete processing notshipped list
                nsModel = {
                    orderId: orderInfo.orderId,
                    orderNumber: orderInfo.orderNumber,
                    parentOrderId: orderInfo.advancedOptions.parentOrderId,
                    isSplited: orderInfo.advancedOptions.isSplited
                }
            notShippedOrderModel.findOneAndUpdate({ orderId: orderInfo.orderId },nsModel,{upsert:true, new:true}, (err, list) => {
                  if (err)
                      console.log(err)
                 else {
                     console.log(`order ${orderInfo.orderId} saved on notShippedOrders list `)
                 }
  
              })
             
         // })
        //  return 'DONE'
      },
}