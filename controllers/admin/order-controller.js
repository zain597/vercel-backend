const Order = require("../../models/Order");



const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await Order.find({  });

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


const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found!"
            });
        }
        await Order.findByIdAndUpdate(id, {orderStatus});
        res.status(200).json({
            success: true,
            message: "Order status is updated successfully!",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status"
        });
    }
}

module.exports = {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
}