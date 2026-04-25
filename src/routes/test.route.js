import express from "express";
import Listing from "../models/listing.model.js";

const router = express.Router();

router.get("/test-insert", async (req, res) => {
  const data = await Listing.create({
    title: "Toyota Avanza 2020",
    price: 200000000,
    year: 2020,
    condition: "used",
    category: {
      id: "car",
      name: "Car",
    },
    location: {
      coordinates: {
        type: "Point",
        coordinates: [106.8456, -6.2088], // Jakarta
      },
    },
    attributes: {
      fuel_type: "petrol",
      transmission: "automatic",
    },
  });

  res.json(data);
});

export default router;
