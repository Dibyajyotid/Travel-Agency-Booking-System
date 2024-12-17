const Package = require("../models/packages")

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find(); 
        res.status(200).json(packages); 
      } catch (err) {
        res.status(500).json({ message: "Error fetching packages", error: err });
      }
}

const getPackage = async (req, res) => {
    const { id } = req.params

    try {
        const package = await Package.findById(id)

        if(!package) {
            return res.status(400).json({ message:"Package Not found" })
        }

        res.status(200).json(package)
    } catch (error) {
        console.error("Error in get package: ", error)
        res.status(500).json({ message:"Internal Server Error"})
    }
}

module.exports = {
    getAllPackages,
    getPackage
}