const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId : String,
    cartId: String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            salePrice : String,
            quantity : Number,
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        city : String,
        pincode : String,
        phone : String,
        notes : String,
    },
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : String,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId: {
      type: String,
      default: null,
    },
    orderStatus: {
      type: String,
      default: null,
    },

    payerId: {
      type: String,
      default: null,
    },
},
{
    timestamps : true,
}
);


module.exports = mongoose.model('Order', OrderSchema)