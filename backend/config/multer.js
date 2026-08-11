const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=> cb(null,"uploads/"),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.orginalname));
    }
});

const fileFilter=(req,file,cb)=>{
    const allowed=["image/jpeg","image/jpg","image/png"];
    if(allowed.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only JPG,JPEG and PNG are allowed"));
    }
};

const upload=multer({
    storage,fileFilter,limits:{
        fileSize:2*1024*1024
    }
});
module.exports=upload;