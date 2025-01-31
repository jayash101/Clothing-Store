import { Router } from "express";
import { searchProducts } from "../../controllers/shop/search.controller.js";

const router = Router();

router.route("/:keyword").get(searchProducts);

export default router;
