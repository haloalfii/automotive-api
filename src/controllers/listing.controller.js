import Listing from "../models/listing.model.js";


// ✅ CREATE
export const createListing = async (req, res) => {
  try {
    const data = await Listing.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ GET ALL (FILTER + PAGINATION)
export const getListings = async (req, res) => {
  try {
    const {
      category,
      min_price,
      max_price,
      fuel_type,
      cursor,
      limit = 10,
    } = req.query;

    const filter = {
      status: "available",
      deleted_at: null,
    };

    // 🔥 category filter
    if (category) {
      filter["category.id"] = category;
    }

    // 🔥 price filter
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    // 🔥 dynamic attribute filter
    if (fuel_type) {
      filter["attributes.fuel_type"] = fuel_type;
    }

    // 🔥 cursor pagination
    if (cursor) {
      filter._id = { $lt: cursor };
    }

    const listings = await Listing.find(filter)
      .sort({ _id: -1 })
      .limit(Number(limit));

    res.json({
      data: listings,
      next_cursor: listings.length ? listings[listings.length - 1]._id : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET DETAIL
export const getListingById = async (req, res) => {
  try {
    const data = await Listing.findById(req.params.id);

    if (!data || data.deleted_at) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE
export const updateListing = async (req, res) => {
  try {
    const data = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ DELETE (Soft Delete)
export const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, {
      status: "removed",
      deleted_at: new Date(),
    });

    res.json({ message: "Listing removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};