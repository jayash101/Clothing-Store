import Router from "express";
import {
  adminOrderDetails,
  adminOrders,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";

const router = Router();

router.route("/get").get(adminOrders);
router.route("/details/:id").get(adminOrderDetails);
router.route("/update/:id").put(updateOrderStatus);

export default router;
