import mongoose from "mongoose";

export const validateCarId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Listing not found",
    });
  }

  next();
};
