import { Router } from "express";
import {
  fetchAllProducts,
  addProduct,
  editProduct,
  handleImageUpload,
  deleteProduct,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../utils/cloudinary.js";

const router = Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.route("/add").post(addProduct);
router.route("/edit/:id").put(editProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/get").get(fetchAllProducts);

export default router;
