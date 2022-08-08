const express = require("express");
const router = express.Router();
const propertyController = require("../controller/property");
router.get("/getAllProperties", propertyController.getAllProperties);
router.post("/addProperties", propertyController.addProoperties);
router.delete("/deleteProperty/:id", propertyController.deleteProperty);
module.exports = router;
