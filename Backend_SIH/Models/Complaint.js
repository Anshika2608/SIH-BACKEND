const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const generateShortUUID = () => {
    return uuidv4().replace(/-/g, '').slice(0, 10); 
}

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const complaintSchema = new mongoose.Schema({
    complaintId: {
        type: String,
        default: generateShortUUID,
        unique: true,
    },
    description: {
        type: String,
        required: true, 
    },
    image: {
        type: [String],
        default: [],
    },
    locality:{
        type:String,
        required:true,
    },
    village:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    createdAt: {
        type: String,
        default: () => formatDate(new Date()), 
    },
});

const Complaint=new mongoose.model('complaints', complaintSchema);
module.exports=Complaint;
