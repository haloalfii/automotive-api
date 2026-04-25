import dotenv from "dotenv";
dotenv.config();

import slugify from "slugify";
import Listing from "../models/listing.model.js";
import connectDB from "../config/db.js";

const listingsSeed = [
  {
    make: "Toyota",
    model: "Avanza",
    year: 2020,
    price: 200000000,
    mileage: 85000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "white",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.8451, -6.2146],
      },
    },
    images: [],
    search_keywords: ["toyota", "avanza", "mpv"],
  },

  {
    make: "Toyota",
    model: "Innova",
    year: 2021,
    price: 320000000,
    mileage: 60000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "diesel",
    color: "black",
    category: { id: "car", name: "Car" },
    location: {
      city: "Bandung",
      province: "Jawa Barat",
      coordinates: {
        type: "Point",
        coordinates: [107.6098, -6.9147],
      },
    },
    images: [],
    search_keywords: ["toyota", "innova", "mpv"],
  },

  {
    make: "Toyota",
    model: "Fortuner",
    year: 2022,
    price: 550000000,
    mileage: 30000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "diesel",
    color: "white",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.8272, -6.1751],
      },
    },
    images: [],
    search_keywords: ["toyota", "fortuner", "suv"],
  },

  {
    make: "Suzuki",
    model: "Swift",
    year: 2019,
    price: 180000000,
    mileage: 70000,
    condition: "used",
    transmission: "manual",
    fuel_type: "petrol",
    color: "red",
    category: { id: "car", name: "Car" },
    location: {
      city: "Surabaya",
      province: "Jawa Timur",
      coordinates: {
        type: "Point",
        coordinates: [112.7521, -7.2575],
      },
    },
    images: [],
    search_keywords: ["suzuki", "swift", "hatchback"],
  },

  {
    make: "Suzuki",
    model: "XL7",
    year: 2022,
    price: 240000000,
    mileage: 40000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "grey",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.865, -6.2297],
      },
    },
    images: [],
    search_keywords: ["suzuki", "xl7", "suv"],
  },

  {
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 450000000,
    mileage: 30000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "black",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.8166, -6.1805],
      },
    },
    images: [],
    search_keywords: ["honda", "civic", "sedan"],
  },

  {
    make: "Honda",
    model: "CR-V",
    year: 2022,
    price: 520000000,
    mileage: 25000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "white",
    category: { id: "car", name: "Car" },
    location: {
      city: "Bandung",
      province: "Jawa Barat",
      coordinates: {
        type: "Point",
        coordinates: [107.6191, -6.9175],
      },
    },
    images: [],
    search_keywords: ["honda", "crv", "suv"],
  },

  {
    make: "Mitsubishi",
    model: "Xpander",
    year: 2021,
    price: 260000000,
    mileage: 50000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "silver",
    category: { id: "car", name: "Car" },
    location: {
      city: "Surabaya",
      province: "Jawa Timur",
      coordinates: {
        type: "Point",
        coordinates: [112.7688, -7.2458],
      },
    },
    images: [],
    search_keywords: ["mitsubishi", "xpander", "mpv"],
  },

  {
    make: "BMW",
    model: "320i",
    year: 2021,
    price: 800000000,
    mileage: 20000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "blue",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.8456, -6.2088],
      },
    },
    images: [],
    search_keywords: ["bmw", "320i", "luxury"],
  },

  {
    make: "Mercedes-Benz",
    model: "C200",
    year: 2022,
    price: 900000000,
    mileage: 15000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "black",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.83, -6.195],
      },
    },
    images: [],
    search_keywords: ["mercedes", "c200", "luxury"],
  },

  {
    make: "Daihatsu",
    model: "Xenia",
    year: 2019,
    price: 170000000,
    mileage: 80000,
    condition: "used",
    transmission: "manual",
    fuel_type: "petrol",
    color: "white",
    category: { id: "car", name: "Car" },
    location: {
      city: "Bandung",
      province: "Jawa Barat",
      coordinates: {
        type: "Point",
        coordinates: [107.62, -6.92],
      },
    },
    images: [],
    search_keywords: ["daihatsu", "xenia", "mpv"],
  },

  {
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 350000000,
    mileage: 10000,
    condition: "used",
    transmission: "automatic",
    fuel_type: "petrol",
    color: "red",
    category: { id: "car", name: "Car" },
    location: {
      city: "Jakarta",
      province: "DKI Jakarta",
      coordinates: {
        type: "Point",
        coordinates: [106.86, -6.2],
      },
    },
    images: [],
    search_keywords: ["hyundai", "creta", "suv"],
  },
];

const runSeed = async () => {
  try {
    await connectDB();

    await Listing.deleteMany({});
    console.log("🧹 Old data cleared");

    const preparedData = listingsSeed.map((item) => ({
      ...item,
      slug: slugify(`${item.make} ${item.model} ${item.year}`, {
        lower: true,
      }),
    }));

    await Listing.insertMany(preparedData);

    console.log("🌱 Seed data inserted");

    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

runSeed();
