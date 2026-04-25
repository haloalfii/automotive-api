import mongoose from "mongoose";
import slugify from "slugify";

const listingSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    year: {
      type: Number,
      index: true,
    },

    mileage: {
      type: Number,
      default: 0,
      index: true,
    },

    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["available", "sold", "removed", "pending"],
      default: "available",
      index: true,
    },

    category: {
      id: {
        type: String,
        required: true,
        index: true,
      },
      name: {
        type: String,
        required: true,
      },
    },

    location: {
      city: String,
      province: String,
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
        },
      },
    },

    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      index: true,
    },

    fuel_type: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
      index: true,
    },

    color: {
      type: String,
      index: true,
    },

    images: [
      {
        type: String,
      },
    ],

    attributes: {
      type: Map,
      of: String,
      default: {},
    },

    search_keywords: {
      type: [String],
      default: [],
    },

    deleted_at: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

listingSchema.index({
  make: "text",
  model: "text",
  color: "text",
  search_keywords: "text",
});

listingSchema.index({
  "location.coordinates": "2dsphere",
});

listingSchema.index({
  status: 1,
  "category.id": 1,
  price: 1,
  year: -1,
});

listingSchema.pre("save", function (next) {
  if (!this.slug) {
    const random = Math.floor(Math.random() * 100000);

    this.slug = slugify(`${this.make}-${this.model}-${this.year}-${random}`, {
      lower: true,
    });
  }
  next();
});

listingSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.make || update.model || update.year) {
    const make = update.make;
    const model = update.model;
    const year = update.year;

    if (make && model && year) {
      const random = Math.floor(Math.random() * 100000);

      update.slug = slugify(`${make}-${model}-${year}-${random}`, {
        lower: true,
      });
    }
  }

  next();
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
