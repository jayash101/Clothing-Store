import { Router } from "express";
import { getFilteredProducts, getProductDetails } from "../../controllers/shop/products.controller.js";

const router = Router();

router.route("/get").get(getFilteredProducts);
router.route("/get/:id").get(getProductDetails);

export default router;