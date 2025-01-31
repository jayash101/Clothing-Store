import { ApiError } from "../../utils/ApiError.js";
import { Address } from "../../models/address.models.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      throw new ApiError("Invalid credentials");
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new ApiError("User ID is required");
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      throw new ApiError("User and address is required");
    }

    const address = await Address.findByIdAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      throw new ApiError("User and address is required");
    }

    const address = await Address.findByIdAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { addAddress, updateAddress, deleteAddress, fetchAllAddress };
