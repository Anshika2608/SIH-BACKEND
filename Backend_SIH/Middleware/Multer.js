const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    }, 
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `image-${uniqueSuffix}${path.extname(file.originalname)}`); // Preserve file extension
    }

});
//imgFilter
const isImage=(req,file,callback)=>{
    const filetypes = /jpeg|jpg|png|gif/;
    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(file.mimetype.startsWith("image") && extname){
       callback(null,true)
    }else{
        callback(new Error("only images are allowed"))
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, 
    fileFilter: isImage
})
const uploadMultiple = upload.fields([
    { name: 'assetImage', maxCount: 5 },
    { name: 'recieptImage', maxCount: 5 },
    {name:'image',maxCount:5}
]);

module.exports = uploadMultiple;