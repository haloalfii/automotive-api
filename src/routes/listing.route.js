import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  searchListings,
  suggestListings
} from "../controllers/listing.controller.js";

import { validateCarId } from "../middlewares/validateCarId.js";

const router = express.Router();

router.get("/search", searchListings);
router.get("/search/suggest", suggestListings);

router.post("/", createListing);
router.get("/", getListings);
router.get("/:id", validateCarId, getListingById);
router.patch("/:id", validateCarId, updateListing);
router.delete("/:id", validateCarId, deleteListing);

export default router;