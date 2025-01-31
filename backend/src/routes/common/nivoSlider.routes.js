import { Router } from "express";
import {
  addFeaturedImage,
  getFeaturedImage,
} from "../../controllers/common/nivoSlider.controller.js";

const router = Router();

router.route("/add").post(addFeaturedImage);
router.route("/get").get(getFeaturedImage);

export default router;
