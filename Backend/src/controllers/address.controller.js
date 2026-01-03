import Address from "../models/Address.js";
import { apiResponse } from "../utils/apiResponse.js";

// @desc    Add new address
// @route   POST /api/address
// @access  Private
export const addAddress = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      street,
      city,
      zip,
      pincode,
      state,
      country
    } = req.body;

    const finalPincode = pincode || zip;
    const finalState = state || "Tamil Nadu";
    const finalCountry = country || "India";

    // 🔥 FIXED VALIDATION
    if (!name || !phone || !street || !city || !finalPincode) {
      return apiResponse(
        res,
        400,
        false,
        "All required fields must be provided"
      );
    }

    const address = await Address.create({
      user: req.user._id,
      name,
      phone,
      street,
      city,
      state: finalState,
      pincode: finalPincode,
      country: finalCountry
    });

    return apiResponse(
      res,
      201,
      true,
      "Address added successfully",
      address
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all addresses
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    apiResponse(res, 200, true, "Addresses fetched", addresses);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete address
export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return apiResponse(res, 404, false, "Address not found");
    }

    if (address.user.toString() !== req.user._id.toString()) {
      return apiResponse(res, 401, false, "Not authorized");
    }

    await address.deleteOne();
    apiResponse(res, 200, true, "Address deleted successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/address/:id
// @access  Private
export const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return apiResponse(res, 404, false, "Address not found");
    }

    if (address.user.toString() !== req.user._id.toString()) {
      return apiResponse(res, 401, false, "Not authorized");
    }

    const {
      name,
      phone,
      street,
      city,
      zip,
      pincode,
      state,
      country
    } = req.body;

    // Optional: add validation here if needed, or rely on mongoose
    const finalPincode = pincode || zip;

    address.name = name || address.name;
    address.phone = phone || address.phone;
    address.street = street || address.street;
    address.city = city || address.city;
    address.pincode = finalPincode || address.pincode;
    address.state = state || address.state;
    address.country = country || address.country;

    const updatedAddress = await address.save();

    apiResponse(
      res,
      200,
      true,
      "Address updated successfully",
      updatedAddress
    );
  } catch (error) {
    next(error);
  }
};
