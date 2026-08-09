const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        const uniqueName=Date.now()+path.extname(file.originalname);
        cb(null,uniqueName);
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png/;
    const isValid=allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(isValid){
        cb(null,true);
    }
    else{
        cb(new Error("Only JPG,JPEG and PNG images are allowed"));
    }
};
const upload=multer({
    storage,fileFilter
});
module.exports=upload;