const assets = require("../Models/Asset")
const newAsset = async (req, res) => {
    try {
        const { Type, scheme, latitude, longitude, budget, startDate, completionDate, expiry, maintainancePeriod, contractorName, contractorBudget,
            warranty, completionTenure, contactNo, review, nextMaintenanceDate } = req.body;


        
        if (contactNo.length !== 10) {
            return res.status(400).json({ message: "Contact number must includes 10 digits" })
        }

        const validateDate = (dateString) => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(dateString)) {
                return false;
            }

            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        };

        if (!validateDate(startDate)) {
            return res.status(400).json({ message: "Start Date must be in the format YYYY-MM-DD and must be a valid date" });
        }

        if (!validateDate(completionDate)) {
            return res.status(400).json({ message: "Completion Date must be in the format YYYY-MM-DD and must be a valid date" });
        }

        if (!validateDate(nextMaintenanceDate)) {
            return res.status(400).json({ message: "Next Maintenance Date must be in the format YYYY-MM-DD and must be a valid date" });
        }


        const assetImages = req.files['assetImage'] ? req.files['assetImage'].map(file => `/uploads/${file.filename}`) : [];
        const recieptImages = req.files['recieptImage'] ? req.files['recieptImage'].map(file => `/uploads/${file.filename}`) : [];

        if (!Type || !latitude || !longitude || !budget || !startDate || !completionDate || !expiry || !maintainancePeriod || !contractorName || !contractorBudget ||
            !warranty || !completionTenure || !contactNo || !assetImages || !recieptImages || !nextMaintenanceDate) {
            return res.status(400).json({ message: "Fill all the required details" })
        }


        const newAsset = new assets({
            Type: Type,
            scheme: scheme,
            latitude: latitude,
            longitude: longitude,
            budget: budget,
            startDate: startDate,
            completionDate: completionDate,
            expiry: expiry,
            maintainancePeriod: maintainancePeriod,
            contractorName: contractorName,
            contractorBudget: contractorBudget,
            warranty: warranty,
            completionTenure: completionTenure,
            contactNo: contactNo,
            review: review,
            assetImage: assetImages,
            recieptImage: recieptImages,
            nextMaintenanceDate: nextMaintenanceDate

        })


        const registeredAsset = await newAsset.save();

        return res.status(201).json({
            message: "Asset Registered successfully.",
            assets: registeredAsset,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while registering a new asset" ,error:error.message})


    }
}

const getAssets = async (req, res) => {
    try {
        const Assets = await assets.find({})
        return res.status(200).json({ message: "Assets recieved successfully", Assets })

    } catch (error) {
        console.log("error while recieving the list of assets", error)
        return res.status(500).json({ message: "Error while recieving the list of assets.",error:error.message })
    }
}


const maintenanceAsset = async (req, res) => {
    try {
        const fiveDaysAhead = new Date();
        fiveDaysAhead.setDate(fiveDaysAhead.getDate() + 5);

        const mainAssets = await assets.find({
            nextMaintenanceDate: { $lte: fiveDaysAhead }
        }).exec(); 

        console.log(mainAssets);

        res.status(200).json(mainAssets);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'An error occurred while fetching maintenance assets.', error:error.message });
    }
};
module.exports = {
    newAsset, getAssets, maintenanceAsset
}