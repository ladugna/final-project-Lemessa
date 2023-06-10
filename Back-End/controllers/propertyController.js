let propertyModel = require("../model/propertyModel");
const fs = require("fs");
const path = require("path");

module.exports.getAllProperties = async (req, res, next) => {
  try {
    const data = await propertyModel.find({});

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

module.exports.getPropertyById = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const data = await propertyModel.findOne({ _id: property_id });

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

module.exports.addNewProperty = async (req, res, next) => {
  try {
    const imagePaths = req.files.map(
      (file) => "http://localhost:3000/images/" + file.filename
    );

    const newProperty = new propertyModel({
      description: req.body.description,
      owner_id: req.body.owner_id,
      address: {
        state: req.body.state,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
      },
      user: {
        name: req.body.name,
        email: req.body.email,
        _id: req.body.user_id,
      },
      type: req.body.type,
      price: req.body.price,
      number_of_bedrooms: req.body.number_of_bedrooms,
      number_of_bathrooms: req.body.number_of_bathrooms,
      status: req.body.status,
      images: imagePaths,
    });
    const result = await newProperty.save();
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.filterProperties = async (req, res, next) => {
  try {
    const filterData = {
      address: {
        state: req.body.state,
        city: req.body.city,
        zip: req.body.zip,
      },
      price: req.body.price,
      number_of_bedrooms: req.body.number_of_bedrooms,
      number_of_bathrooms: req.body.number_of_bathrooms,
      status: req.body.status,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    const query = {};
    if (filterData.address) {
      if (filterData.address.state && filterData.address.state != "") {
        query["address.state"] = filterData.address.state;
      }
      if (filterData.address.city && filterData.address.city != "") {
        query["address.city"] = filterData.address.city;
      }
      if (filterData.address.zip && filterData.address.zip != "") {
        query["address.zip"] = filterData.address.zip;
      }
    }
    if (filterData.price && filterData.price != "") {
      query.price = filterData.price;
    }

    if (filterData.number_of_bedrooms && filterData.number_of_bedrooms != 0) {
      query.number_of_bedrooms = filterData.number_of_bedrooms;
    }

    if (filterData.number_of_bathrooms && filterData.number_of_bathrooms != 0) {
      query.number_of_bathrooms = filterData.number_of_bathrooms;
    }

    if (filterData.status && filterData.status != "") {
      query.status = filterData.status;
    }
    let data;
    if (
      filterData.longitude &&
      filterData.longitude != "" &&
      filterData.latitude &&
      filterData.latitude != ""
    ) {
      data = await propertyModel.find(query).sort({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [filterData.longitude, filterData.latitude],
            },
            $maxDistance: 10000, // max distance in meters
          },
        },
      });
    } else data = await propertyModel.find(query);

    res.json({ success: true, result: data });
  }
   catch (err) {
    next(err);
  }
};

module.exports.updateProperty = async (req, res, next) => {
  try {
    const { property_id} = req.params;
    const {owner_id} =req.token
    const data = await propertyModel.updateOne(
      { _id: property_id, owner_id },
      { $set: { price: req.body.price } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePropertyById = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const {owner_id} =req.token
    const data = await propertyModel.deleteOne({ _id: property_id, owner_id});

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};

module.exports.updloadImage = async (req, res, next) => {
  try {
    const { property_id } = req.params;

    const data = await propertyModel.updateOne(
      { _id: property_id },
      { $push: { images: { path: req.file.filename } } }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};
module.exports.getImage = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const data = await propertyModel.findOne(
      { _id: property_id },
      { images: 1, _id: 0 }
    );

    res.json({ success: true, result: data });
  } catch (error) {
    next(error);
  }
};
