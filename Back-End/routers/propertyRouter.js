const express = require("express");
const {
  getAllProperties,
  addNewProperty,
  updateProperty,
  getPropertyById,
  deletePropertyById,
  updloadImage,
  getImage,
  filterProperties,
} = require("../controllers/propertyController");
const checkToken = require("../middlewares/checkToken");
// const checkPrice = require("../middlewares/checkPrice");
// const storage = require("../helpers/storage");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `FunOfHeuristic_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllProperties);
router.post("/", checkToken, upload.array("images"), addNewProperty);
router.post("/filter", filterProperties);

router.put("/:property_id", checkToken, updateProperty);
router.get("/:property_id", getPropertyById);
router.delete("/:property_id", checkToken, deletePropertyById);

module.exports = router;
