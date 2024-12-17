const express = require("express");
const { getAllPackages, getPackage } = require("../controllers/packageController.js");

const router = express.Router();

// Define routes
router.get("/", getAllPackages);
router.get("/:id", getPackage);

// Export router instance
module.exports = router;
