import Router from "express";
import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/review.controller.js";

const router = Router();

router.route("/add").post(addProductReview);
router.route("/:productId").get(getProductReviews);

export default router;
