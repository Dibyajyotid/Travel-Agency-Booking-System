const Bookings = require("../models/booking.js");
const Package = require("../models/packages.js");


const createPackageBooking = async (req, res) => {
    const { name, email, phoneNumber, numberOfTravellers, specialRequests, packageId } = req.body;
    

    try {
        
        const packageDetails = await Package.findById(packageId);
        if (!packageDetails) {
            return res.status(404).json({ message: "Package not found" });
        }

        const totalPrice = packageDetails.price * numberOfTravellers;

        const newBooking = new Bookings({
            name,
            email,
            phoneNumber,
            numberOfTravellers,
            price: totalPrice,  
            packageId,
            specialRequests
        });

        await newBooking.save();

        return res.status(200).json({
            _id: newBooking._id,
            name: newBooking.name,
            email: newBooking.email,
            phoneNumber: newBooking.phoneNumber,
            price: newBooking.price,
            packageId: newBooking.packageId,
            specialRequests: newBooking.specialRequests
        })
    } catch (error) {
        return res.status(500).json({ message: "Error booking package", error });
    }
};

//getting the booking details by id
const getBookingsById = async (req, res) => {
    const { id } = req.params; 

    try {
        const booking = await Bookings.findById(id).populate('packageId')

        console.log(booking.packageId)

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const response = {
            _id: booking._id,
            name: booking.name,
            email: booking.email,
            phoneNumber: booking.phoneNumber,
            numberOfTravellers: booking.numberOfTravellers,
            specialRequests: booking.specialRequests,
            price: booking.price,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            packageDetails: booking.packageId ?{
                _id: booking.packageId._id,
                name: booking.packageId.title,
                description: booking.packageId.description,
                price: booking.packageId.price,
                imageUrl: booking.packageId.imageUrl,
            } : null
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching booking details:", error);
        return res.status(500).json({ message: "Error fetching booking details", error });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find().populate("packageId");
        const response = bookings.map((booking) => ({
            _id: booking._id,
            name: booking.name,
            email: booking.email,
            phoneNumber: booking.phoneNumber,
            numberOfTravellers: booking.numberOfTravellers,
            specialRequests: booking.specialRequests,
            price: booking.price,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            packageDetails: booking.packageId? 
                {
                    _id: booking.packageId._id,
                    name: booking.packageId.title,
                    description: booking.packageId.description,
                    price: booking.packageId.price,
                    imageUrl: booking.packageId.imageUrl,
                }
            : null,
        }));
    
        res.json(response);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
}

module.exports = { 
    createPackageBooking,
    getBookingsById,
    getAllBookings
};


