import { ApiError } from "../../utils/ApiError.js";
import { Cart } from "../../models/cart.models.js";
import { Product } from "../../models/products.models.js";

const addCartItems = async (req, res) => {
  try {
    // Get all information from body
    const { userId, productId, quantity } = req.body;

    // Check if the information is empty
    if (!userId || !productId || quantity <= 0) {
      throw new ApiError(400, "Invalid data!");
    }

    // Find the product
    const product = await Product.findById(productId);

    // Check if the product is empty
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Find the cart
    let cart = await Cart.findOne({ userId });

    // If user is adding to cart for the first time, add new items
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check the current number list of items
    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If empty, add new product and quantity
    if (currentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    }
    // If not empty, increase the quantity
    else {
      cart.items[currentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const fetchCartItems = async (req, res) => {
  try {
    // Get user id
    const { userId } = req.params;

    // Check if user id is empty
    if (!userId) {
      throw new ApiError(400, "User id is required");
    }

    // find cart from user
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // check if the cart is empty [if you want to load the page despite error, don't use ApiError]
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });

      // throw new ApiError(404, "Cart not found");
    }

    // Check if the current item matches the item in admin page
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // List all cart items
    const listCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: listCartItems,
      },
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateCartItems = async (req, res) => {
  try {
    // Get data from user
    // UserId: which user's product to updare
    // ProductId: which product to update
    // Quantity: update amount of quantity
    const { userId, productId, quantity } = req.body;

    //  Validate the data
    if (!userId || !productId || !quantity) {
      throw new ApiError(400, "Invalid data provided");
    }

    // Find the cart
    const cart = await Cart.findOne({ userId });

    // Check if cart is present
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    // Check the current list of items
    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Check if items are not present
    if (currentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart items not found",
      });
    }

    cart.items[currentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const listCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart.doc,
        items: listCartItems,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Error");
  }
};

const deleteCartItems = async (req, res) => {
  try {
    // Get data from user
    // UserId: whose product to delete
    // ProductId: which product to delete
    const { userId, productId } = req.params;

    //  Validate the data
    if (!userId || !productId) {
      throw new ApiError(400, "Invalid data provided");
    }

    // Find the cart
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Check if cart is present
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    // Check and filter which item to delete
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const listCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: listCartItems,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Error");
  }
};

export { addCartItems, fetchCartItems, updateCartItems, deleteCartItems };
