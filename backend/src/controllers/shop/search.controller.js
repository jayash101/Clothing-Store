import { Product } from "../../models/products.models.js";

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regExp = new RegExp(keyword, "i"); // "i" means case sensitive

    const createSearchQuery = {
      $or: [
        { title: regExp },
        { description: regExp },
        { category: regExp },
        { brand: regExp },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { searchProducts };
