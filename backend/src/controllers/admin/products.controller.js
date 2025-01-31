import { Product } from "../../models/products.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { imageUploadUtils } from "../../utils/cloudinary.js";

const handleImageUpload = asyncHandler(async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      result,
    });

    console.log(result);
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
});

// add new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error creating product");
  }
};

// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const productLists = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: productLists,
    });
  } catch (error) {
    console.log(e);
    throw new ApiError(500, "Error fetching products");
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct) {
      throw new ApiError(404, "Product not found");
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product edited successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error editing product");
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete(id);

    if (!findProduct) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error deleting product");
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
