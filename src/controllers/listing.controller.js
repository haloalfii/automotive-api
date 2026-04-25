import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const data = await Listing.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

    if (category) {
      filter["category.id"] = category;
    }

    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    if (fuel_type) {
      filter["attributes.fuel_type"] = fuel_type;
    }

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

export const updateListing = async (req, res) => {
  try {
    const data = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

// Search
export const searchListings = async (req, res) => {
  try {
    const {
      q,
      category,
      min_price,
      max_price,
      condition,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    const filter = {
      deleted_at: null,
    };

    if (q) {
      filter.$text = { $search: q };
    }

    if (category) {
      filter["category.id"] = category;
    }

    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    if (condition) {
      filter.condition = condition;
    }

    let sortOption = {};

    if (q) {
      sortOption = { score: { $meta: "textScore" } };
    } else if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else {
      sortOption.created_at = -1;
    }

    const skip = (page - 1) * limit;

    const query = Listing.find(
      filter,
      q ? { score: { $meta: "textScore" } } : {},
    )
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const data = await query;

    const total = await Listing.countDocuments(filter);

    return res.json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const suggestListings = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json({ success: true, data: [] });
    }

    const keywords = q.split(" ").filter(Boolean);
    const regex = new RegExp(keywords.join("|"), "i");

    const data = await Listing.find(
      {
        deleted_at: null,
        title: { $regex: regex },
      },
      {
        title: 1,
        _id: 0,
      },
    ).limit(10);

    const suggestions = [...new Set(data.map((i) => i.title))];

    return res.json({
      success: true,
      data: suggestions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
