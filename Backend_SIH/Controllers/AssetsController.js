const assets = require("../Models/Asset")
const newAsset = async(req, res) => {
    try {
        const { Type, scheme, latitude, longitude, budget, startDate, completionDate, expiry, maintainancePeriod, contractorName, contractorBudget,
            warranty, completionTenure, contactNo, review } = req.body;

       

        const assetImages = req.files['assetImage'] ? req.files['assetImage'].map(file => `/uploads/${file.filename}`) : [];
        const recieptImages = req.files['recieptImage'] ? req.files['recieptImage'].map(file => `/uploads/${file.filename}`) : [];
        if (!Type || !latitude || !longitude || !budget || !startDate || !completionDate || !expiry || !maintainancePeriod || !contractorName || !contractorBudget ||
            !warranty || !completionTenure || !contactNo || !assetImages ||!recieptImages) {
            return res.status(400).json({ message: "Fill all the required details" })
        }
        const newAsset = new assets({
            Type: Type,
            scheme: scheme,
            latitude:latitude,
            longitude:longitude,
            budget:budget,
            startDate:startDate,
            completionDate:completionDate,
            expiry:expiry,
            maintainancePeriod:maintainancePeriod,
            contractorName:contractorName,
            contractorBudget:contractorBudget,
            warranty:warranty,
            completionTenure:completionTenure,
            contactNo:contactNo,
            review:review,
            assetImage: assetImages,
            recieptImage: recieptImages

        })
        

        const registeredAsset= await newAsset.save();

        return res.status(201).json({
            message: "Asset Registered successfully.",
            assets: registeredAsset,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while registering a new asset" })


    }
}
module.exports = {
    newAsset
}