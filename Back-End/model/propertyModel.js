const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    description: String,
    owner_id: mongoose.SchemaTypes.ObjectId,
    address: {
      state: String,
      city: String,
      street: String,
      zip: String,
      longitude : String,
      latitude : String,
    },
    type: String,
    price: Number,
    number_of_bedrooms: Number,
    number_of_bathrooms: Number,
    status: String,
    images: [String],
    user: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      email: String,
      name: String,
    },
    offers: [
      {
        customer_id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
        },
        price: Number,
        expiration_date: Date,
        status: String,
        description: String,
        title: String,
        property_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
