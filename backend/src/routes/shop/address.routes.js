import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "../../controllers/shop/address.controller.js";

const router = Router();

router.route("/add").post(addAddress);
router.route("/get/:userId").get(fetchAllAddress);
router.route("/update/:userId/:addressId").put(updateAddress);
router.route("/delete/:userId/:addressId").delete(deleteAddress);

export default router;
