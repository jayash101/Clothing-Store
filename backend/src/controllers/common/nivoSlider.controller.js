import { NivoSlider } from "../../models/nivoslider.models.js";
import { ApiError } from "../../utils/ApiError.js";

// add featured image for admin view
const addFeaturedImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featuredImages = new NivoSlider({ image });

    await featuredImages.save();

    res.status(201).json({
      success: true,
      data: featuredImages,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// get featured image for client view
const getFeaturedImage = async (req, res) => {
  try {
    const images = await NivoSlider.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { addFeaturedImage, getFeaturedImage };
