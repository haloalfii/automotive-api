import Listing from "../models/listing.model.js";
import parseSearchQuery from "../utils/parseSearchQuery.js";

export const createListing = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      status: req.body.status || "available",
    };

    const data = await Listing.create(payload);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListings = async (req, res) => {
  try {
    const {
      category,
      min_price,
      max_price,
      fuel_type,
      transmission,
      color,
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
      filter.fuel_type = fuel_type;
    }

    if (transmission) {
      filter.transmission = transmission;
    }

    if (color) {
      filter.color = color;
    }

    if (cursor) {
      filter._id = { $lt: cursor };
    }

    const listings = await Listing.find(filter)
      .sort({ _id: -1 })
      .limit(Number(limit));

    return res.json({
      success: true,
      data: listings,
      next_cursor: listings.length ? listings[listings.length - 1]._id : null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListingById = async (req, res) => {
  try {
    const data = await Listing.findById(req.params.id);

    if (!data || data.deleted_at) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const updateData = { ...req.body };

    delete updateData._id;
    delete updateData.deleted_at;

    const data = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const data = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        status: "removed",
        deleted_at: new Date(),
      },
      { new: true },
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.json({
      success: true,
      message: "Listing removed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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

    let filter = {
      deleted_at: null,
      status: "available",
    };

    if (q) {
      const parsed = parseSearchQuery(q);

      const regex = new RegExp(q, "i");

      const hasStructured = parsed.make || parsed.year || parsed.fuel_type;

      if (hasStructured) {
        const structuredFilter = {};

        if (parsed.make) {
          structuredFilter.make = new RegExp(parsed.make, "i");
        }

        if (parsed.year) {
          structuredFilter.year = parsed.year;
        }

        if (parsed.fuel_type) {
          structuredFilter.fuel_type = parsed.fuel_type;
        }

        Object.assign(filter, structuredFilter);
      } else {
        filter.$or = [
          { make: regex },
          { model: regex },
          { search_keywords: regex },
        ];
      }
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

    if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else {
      sortOption.created_at = -1;
    }

    const skip = (page - 1) * limit;

    const data = await Listing.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

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

    const regex = new RegExp(q, "i");

    const data = await Listing.find(
      {
        deleted_at: null,
        $or: [{ make: regex }, { model: regex }, { search_keywords: regex }],
      },
      {
        make: 1,
        model: 1,
        _id: 0,
      },
    ).limit(10);

    // format suggestion better
    const suggestions = [
      ...new Set(data.map((item) => `${item.make} ${item.model}`)),
    ];

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
