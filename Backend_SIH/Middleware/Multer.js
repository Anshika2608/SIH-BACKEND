const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    }, 
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
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


module.exports = upload;