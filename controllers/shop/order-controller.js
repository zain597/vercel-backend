const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


const createOrder = async (req, res) => {    
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            paymentMethod,
            totalAmount,
            cartId,
        } = req.body;

        const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus: "pending",
            paymentMethod,
            paymentStatus: "pending",
            totalAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
        });

        for(let item of newlyCreatedOrder.cartItems){
            let product = await Product.findById(item.productId)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Not enough stock for this product ${product.title}`,
                });
            }

            product.totalStock -= item.quantity
            await product.save();
        }

        await newlyCreatedOrder.save();

        // Clear cart after order creation
        await Cart.findByIdAndUpdate(cartId, {
            items: [],
        });

        
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId: newlyCreatedOrder._id,
        });
    } catch (e) {

        res.status(500).json({
        success: false,
        message: "Some error occurred!",
        });
    }
};


const capturePayment = async (req, res) => {
    try {
        // Logic to create a new order
        const {paymentId, payerId, orderId} = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ 
                success: false,
                message: "Order can not be found"
            });
        }
        order.paymentStatus = 'paid';
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;
        order.orderUpdateDate = new Date();

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save();
        
        res.status(201).json({ 
            success: true,
            message: "Order created successfully",
            data: order
        });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ 
            success: false,
            message: "Failed to create order"
        });
    }

}

const getAllOrdersByUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({  
            success: false,
            message: "Failed to fetch orders"
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found!"
            });
        }


        res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({  
            success: false,
            message: "Failed to fetch order details"
        });
    }
}


module.exports = {
    createOrder,
    capturePayment,
    getAllOrdersByUser,
    getOrderDetails
}