import { Product } from "../../models/products.models.js";
import { ApiError } from "../../utils/ApiError.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = {
        $in: category.split(","),
      };
    }

    if (brand.length) {
      filters.brand = {
        $in: brand.split(","),
      };
    }

    let sort = {};

    if (sortBy === "price-lowtohigh") {
      sort.price = 1;
    } else if (sortBy === "price-hightolow") {
      sort.price = -1;
    } else if (sortBy === "title-atoz") {
      sort.title = 1;
    } else if (sortBy === "title-ztoa") {
      sort.title = -1;
    } else {
      sort.price = 1;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    throw new ApiError(500, "Some error occurred");
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    throw new ApiError(500, "Some error occurred");
  }
};

export { getFilteredProducts, getProductDetails };
