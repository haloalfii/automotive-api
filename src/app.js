import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import listingRoute from "./routes/listing.route.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

// test route
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/listings", listingRoute);

export default app;
