const Complaint = require("../Models/Complaint");
const cloudinary=require("../Middleware/Cloudinary")
const raiseComplaint = async (req, res) => {
    try {
        const { description,locality,village,city,state } = req.body;

        if (!description || !locality || !village || !city || !state ) {
            return res.status(400).json({ message: "Fill all the required fields." });
        }
        const imageUrls = [];
        if ( req.files['image']) {
            for (const file of req.files['image']) {
                try {
                    const upload = await cloudinary.uploader.upload(file.path);
                    imageUrls.push(upload.secure_url);
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    return res.status(500).json({ message: "Error uploading image." });
                }
            }
        }  
          const newComplaint = new Complaint({
            description:description,
            image:imageUrls,
            locality:locality,
            village:village,
            city:city,
            state:state,
           
        });

        const savedComplaint = await newComplaint.save();

        return res.status(201).json({
            message: "Complaint raised successfully.",
            complaint: savedComplaint,
        });
    } catch (error) {
        console.error("Error raising complaint:", error);
        return res.status(500).json({ message: "An error occurred while raising the complaint." , error: error.message,});
    }
};

const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({});

        return res.status(200).json({
            message: "Complaints retrieved successfully.",
            complaints,
        });
    } catch (error) {
        console.error("Error retrieving complaints:", error);
        return res.status(500).json({ message: "An error occurred while retrieving complaints." });
    }
};

module.exports = { raiseComplaint,getComplaints };