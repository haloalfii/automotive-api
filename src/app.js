import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import listingRoute from "./routes/listing.route.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀",
  });
});

app.use("/api/listings", listingRoute);

export default app;
