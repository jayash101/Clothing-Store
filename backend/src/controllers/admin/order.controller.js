import { Order } from "../../models/order.models.js";
import { ApiError } from "../../utils/ApiError.js";

const adminOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const adminOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    // search the product id to update
    const { id } = req.params;

    // fetch the current order status of the id
    const { orderStatus } = req.body;

    // search the product by id
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // update the orderStatus
    await Order.findByIdAndUpdate(id, { orderStatus });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { adminOrders, adminOrderDetails, updateOrderStatus };
