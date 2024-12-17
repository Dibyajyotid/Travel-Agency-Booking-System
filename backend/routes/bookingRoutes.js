const express = require("express");
const { createPackageBooking, getBookingsById } = require("../controllers/bookingController.js")
const router = express.Router();

// Define routes
router.post("/", createPackageBooking);
router.get("/:id", getBookingsById)


// Export router instance
module.exports = router;