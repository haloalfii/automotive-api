import dotenv from "dotenv";
dotenv.config();

import slugify from "slugify";
import Listing from "../models/listing.model.js";
import connectDB from "../config/db.js";

const listingsSeed = [
  ...Array.from({ length: 60 }).map((_, i) => {
    const makes = [
      "Toyota",
      "Honda",
      "Suzuki",
      "Mitsubishi",
      "Daihatsu",
      "Hyundai",
      "BMW",
      "Mercedes-Benz",
    ];
    const models = [
      "Avanza",
      "Innova",
      "Fortuner",
      "Civic",
      "CR-V",
      "Xpander",
      "Xenia",
      "Swift",
      "XL7",
      "Creta",
      "320i",
      "C200",
    ];
    const fuel = ["petrol", "diesel"];
    const transmission = ["automatic", "manual"];
    const colors = ["white", "black", "silver", "red", "blue", "grey"];

    const make = makes[Math.floor(Math.random() * makes.length)];
    const model = models[Math.floor(Math.random() * models.length)];

    return {
      make,
      model,
      year: 2018 + Math.floor(Math.random() * 7),
      price: 150000000 + Math.floor(Math.random() * 900000000),
      mileage: 10000 + Math.floor(Math.random() * 90000),
      condition: Math.random() > 0.3 ? "used" : "new",
      transmission:
        transmission[Math.floor(Math.random() * transmission.length)],
      fuel_type: fuel[Math.floor(Math.random() * fuel.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      category: { id: "car", name: "Car" },
      location: {
        city: "Jakarta",
        province: "DKI Jakarta",
        coordinates: {
          type: "Point",
          coordinates: [
            106.8456 + Math.random() * 0.01,
            -6.2088 + Math.random() * 0.01,
          ],
        },
      },
      images: [],
      search_keywords: [make.toLowerCase(), model.toLowerCase(), "car"],
    };
  }),

  ...Array.from({ length: 40 }).map((_, i) => {
    const motorBrands = ["Yamaha", "Honda", "Suzuki", "Kawasaki"];
    const motorModels = ["NMAX", "Vario", "Beat", "Aerox", "GSX", "R15", "KLX"];

    const make = motorBrands[Math.floor(Math.random() * motorBrands.length)];
    const model = motorModels[Math.floor(Math.random() * motorModels.length)];

    return {
      make,
      model,
      year: 2017 + Math.floor(Math.random() * 8),
      price: 15000000 + Math.floor(Math.random() * 80000000),
      mileage: 5000 + Math.floor(Math.random() * 50000),
      condition: Math.random() > 0.2 ? "used" : "new",
      transmission: "manual",
      fuel_type: "petrol",
      color: ["black", "red", "white", "blue"][Math.floor(Math.random() * 4)],
      category: { id: "motorcycle", name: "Motorcycle" },
      location: {
        city: "Jakarta",
        province: "DKI Jakarta",
        coordinates: {
          type: "Point",
          coordinates: [
            106.8456 + Math.random() * 0.01,
            -6.2088 + Math.random() * 0.01,
          ],
        },
      },
      images: [],
      search_keywords: [make.toLowerCase(), model.toLowerCase(), "motorcycle"],
    };
  }),
];

export default listingsSeed;

const runSeed = async () => {
  try {
    await connectDB();

    await Listing.deleteMany({});
    console.log("🧹 Old data cleared");

    const preparedData = listingsSeed.map((item) => {
      const random = Math.floor(Math.random() * 100000);

      return {
        ...item,
        slug: slugify(`${item.make}-${item.model}-${item.year}-${random}`, {
          lower: true,
        }),
      };
    });

    await Listing.insertMany(preparedData);

    console.log("🌱 Seed data inserted");

    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

runSeed();
