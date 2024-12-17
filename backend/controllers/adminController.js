const cloudinary = require("../lib/cloudinary.js")
const Package = require("../models/packages.js")


//adding new package
const addNewPackage = async (req, res) => {
    const { title, description, price, availableDates, image} = req.body
    try {
        if(!title || !description || !price || !availableDates ){
            return res.status(400).json({ message:"All fields are required" })
        }

        const availableDatesString = JSON.parse(req.body.availableDates);


        const formattedDates = availableDatesString.map(date => {
            const newDate = new Date(date);
            if (isNaN(newDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format in availableDates" });
            }
            return newDate.toISOString(); 
        });

        let imageUrl
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }

        const newPackage = new Package({
            title,
            description,
            price,
            availableDates: formattedDates,
            image: imageUrl,
        })

        if(newPackage){
            await newPackage.save()

            return res.status(200).json({
                _id: newPackage._id,
                title: newPackage.title,
                description: newPackage.description,
                price: newPackage.price,
                availableDates: newPackage.availableDates,
                image: newPackage.image,
            })
        }
    } catch (error) {
        console.log("Error in add package: ", error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

//updating a package - put request
const updatePackage = async(req, res) => {
    const { id } = req.params
    const updates = req.body

    try {
        const updatedPackage = await Package.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })

        if(!updatedPackage){
            return res.status(400).json({ message:"Package not found"})
        }

        return res.status(201).json({ message: "Package updated successfully", updatedPackage });
    } catch (error) {
        console.log("Error in update package ", error)
        return res.status(500).json({ message:"Internal Server Error" })
    }
}

//deleting a package
const deletePackage = async(req, res) => {
    const { id } = req.params
    try {

        const package = await Package.findById(id);
        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }
        
        await Package.findByIdAndDelete(id)

        return res.status(200).json({ message:`package with id: ${id} id successfully removed` })

    } catch (error) {
        console.error("error in delete package: ", error)
        return res.status(500).json({ message:"Internal server Error"})
    }
}


module.exports = {
    addNewPackage,
    updatePackage,
    deletePackage,
}