import Router from "express";
import {
  capturePayment,
  createOrder,
  orderDetails,
  userOrders,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.route("/create").post(createOrder);
router.route("/capture").post(capturePayment);
router.route("/list/:userId").get(userOrders);
router.route("/details/:id").get(orderDetails);

export default router;
