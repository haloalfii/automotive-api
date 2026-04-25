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

const router = express.Router();

router.get("/search", searchListings);
router.get("/search/suggest", suggestListings);

router.post("/", createListing);
router.get("/", getListings);
router.get("/:id", getListingById);
router.patch("/:id", updateListing);
router.delete("/:id", deleteListing);

export default router;