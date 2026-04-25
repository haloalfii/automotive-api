import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    year: Number,
    mileage: Number,

    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "sold", "removed"],
      default: "available",
    },

    category: {
      id: {
        type: String,
        required: true,
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
          type: [Number], // [lng, lat]
        },
      },
    },

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
  status: 1,
  "category.id": 1,
  price: 1,
  year: -1,
});

listingSchema.index({
  title: "text",
  search_keywords: "text",
});

listingSchema.index({
  "location.coordinates": "2dsphere",
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
