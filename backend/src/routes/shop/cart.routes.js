import { Router } from "express";

import {
  addCartItems,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
} from "../../controllers/shop/cart.controller.js";

const router = Router();

router.route("/add").post(addCartItems);

// Because req.params was used
router.route("/get/:userId").get(fetchCartItems);

router.route("/update-cart").put(updateCartItems);

//TODO: Because req.params was used
router.route("/:userId/:productId").delete(deleteCartItems);

export default router;
