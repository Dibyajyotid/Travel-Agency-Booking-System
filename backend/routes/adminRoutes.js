const express = require("express")
const { addNewPackage, updatePackage, deletePackage, } = require("../controllers/adminController.js")
const { getAllPackages, getPackage } = require("../controllers/packageController.js")
const { getAllBookings, getBookingsById } = require("../controllers/bookingController.js")


const router = express.Router()

router.get("/", getAllPackages)

//for packages
router.post("/packages", addNewPackage)
router.put("/packages/:id", updatePackage)
router.delete("/packages/:id", deletePackage)
router.get("/packages/:id", getPackage)

//for bookings
router.get("/bookings", getAllBookings)
router.get("/bookings/:id", getBookingsById)

//exporting router oinstance
module.exports = router