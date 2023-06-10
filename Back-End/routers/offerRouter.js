const express = require("express");
const {
  createNewOffer,
  updateOfferById,
  deleteOfferById,
  getOffersByOwnerId,
  rejectOfferById,
  acceptOfferById,
  getAllOffers,
} = require("../controllers/offerController");
const checkToken = require("../middlewares/checkToken");
const router = express.Router();

router.post("/",checkToken, createNewOffer);
router.put("/:offer_id",checkToken, updateOfferById);
router.put("/:offer_id/accept",checkToken, acceptOfferById);
router.put("/:offer_id/reject",checkToken, rejectOfferById);
router.get("/:owner_id",checkToken, getOffersByOwnerId);
router.get("/",checkToken, getAllOffers);
router.delete("/:offer_id",checkToken, deleteOfferById);

module.exports = router;
