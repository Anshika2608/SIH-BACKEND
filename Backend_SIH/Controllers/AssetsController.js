const assets = require("../Models/Asset")
const newAsset = async(req, res) => {
    try {
        const { Type, scheme, latitude, longitude, budget, startDate, completionDate, expiry, maintainancePeriod, contractorName, contractorBudget,
            warranty, completionTenure, contactNo, review,lastMaintenanceDate } = req.body;

       

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
            recieptImage: recieptImages,
            lastMaintenanceDate:lastMaintenanceDate||null

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

const getAssets=async(req,res)=>{
    try{
        const Assets=await assets.find({})
        return res.status(200).json({message:"Assets recieved successfully",Assets})

    }catch(error){
       console.log("error while recieving the list of assets",error)
       return res.status(500).json({message:"Error while recieving the list of assets."})
    }
}


const maintenanceAsset = async (req, res) => {
    try {
        const currentDate = new Date();
        const dateIn5Days = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);

        const mainAssets = await assets.aggregate([
            {
                $addFields: {
                    nextMaintenanceDate: {
                        $cond: {
                            if: { $eq: ["$lastMaintenanceDate", null] },
                            then: {
                                $dateAdd: {
                                    startDate: "$completionDate",
                                    unit: "month",
                                    amount: { $toInt: "$completionTenure" }
                                }
                            },
                            else: {
                                $dateAdd: {
                                    startDate: "$lastMaintenanceDate",
                                    unit: "month",
                                    amount: { $toInt: "$completionTenure" }
                                }
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    nextMaintenanceDate: {
                        $gte: currentDate,
                        $lte: dateIn5Days
                    }
                }
            }
        ]);

        res.status(200).json(mainAssets);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'An error occurred while fetching maintenance assets.', error });
    }
};



module.exports = {
    newAsset,getAssets,maintenanceAsset
}