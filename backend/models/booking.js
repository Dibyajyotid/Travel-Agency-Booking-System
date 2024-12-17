const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },

    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10,
    },

    numberOfTravellers: {
        type: Number,
        required: true,
        maxlength: 6,
    },

    price: {
        type: Number,
        required: true,
    },

    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },

    specialRequests: {
        type: String,
        default: "",
    }, 
}, { timestamps: true })

const Bookings = mongoose.model("Bookings", bookingSchema)
module.exports = Bookings