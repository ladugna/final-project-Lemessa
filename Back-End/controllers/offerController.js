const offerModel = require("../model/propertyModel");

exports.getOffersByOwnerId = async (req, res, next) => {
  try {
    const { owner_id } = req.params;
    const data = await offerModel.find({ owner_id: owner_id }, { _id: 0 });
    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

exports.getAllOffers = async (req, res, next) => {
  try {
    const data = await offerModel.find({});
    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

// // Create a new offer
exports.createNewOffer = async (req, res, next) => {
  try {
    const { property_id } = req.body;
    const newOffer = {
      customer_id: req.body.customer_id,
      property_id: req.body.property_id,
      price: req.body.price,
      expiration_date: req.body.expiration_date,
      status: req.body.status,
      description: req.body.description,
      title: req.body.title,
    };
    const data = await offerModel.updateOne(
      { _id: property_id },
      { $push: { offers: newOffer } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

// Update an offer by ID
exports.updateOfferById = async (req, res, next) => {
  try {
    const { property_id, offer_id } = req.params;
    const { status } = req.body;
    const data = await offerModel.updateOne(
      { _id: property_id, "offers._id": offer_id },
      { $set: { "offers.$.status": status } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

exports.acceptOfferById = async (req, res, next) => {
  try {
    const { property_id } = req.body;
    const { offer_id } = req.params;
    const filter = {
      "offers.property_id": property_id,
      "offers.status": { $ne: "Approved" },
    };

    const update = {
      $set: {
        status: "Sold",
        "offers.$[approvedOffer].status": "Approved",
        "offers.$[rejectedOffers].status": "Rejected",
      },
    };

    const arrayFilters = [
      { "approvedOffer._id": offer_id },
      { "rejectedOffers._id": { $ne: offer_id } },
    ];

    const options = { arrayFilters };
    const data = await offerModel.updateOne(filter, update, options);
    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

exports.rejectOfferById = async (req, res, next) => {
  try {
    const { property_id } = req.body;
    const { offer_id } = req.params;
    const data = await offerModel.updateOne(
      { _id: property_id, "offers._id": offer_id },
      { $set: { "offers.$.status": "Rejected" } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

// // Delete an offer by ID

exports.deleteOfferById = async (req, res, next) => {
  try {
    const { offer_id } = req.params;
    const property_id  = req.query.property_id;
    const data = await offerModel.updateOne(
      { _id: property_id },
      { $pull: { offers: { _id: offer_id } } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};
