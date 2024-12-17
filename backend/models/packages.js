const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    availableDates: {
        type: [Date],
        required: true
    },

    image: {
        type: String,
        default: "",
    }
}, { timestamps: true })

const Package = mongoose.model("Package", packageSchema)

module.exports =  Package