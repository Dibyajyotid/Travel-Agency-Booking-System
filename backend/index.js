const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const connectDB = require("./lib/db.js")
const path = require("path")
//const cors = require("cors");

const packageRoutes = require("./routes/packageRoutes.js")
const bookingRoutes = require("./routes/bookingRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const basicAuth = require("./middlewares/auth.js")

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
//app.use(cors())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json())

const PORT = process.env.PORT || 5003
//const __dirname = path.resolve()

//basic authentication to the admin route
app.use("/admin", basicAuth)

app.use("/packages", packageRoutes)
app.use("/bookings", bookingRoutes)
app.use("/admin", adminRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/.next")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", ".next"))
    })
}

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
    connectDB()
})

