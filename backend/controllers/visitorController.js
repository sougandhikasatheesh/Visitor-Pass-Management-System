const Visitor=require('../models/Visitor');
//create visitor
const createVisitor=async(req,res)=>{
    try{
        const {
    visitorName,
    email,
    phone,
    purpose,
    personToMeet,
    visitDate
} = req.body;

const visitor = await Visitor.create({
    visitorName,
    email,
    phone,
    purpose,
    personToMeet,
    visitDate
});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
};

//get all the visitors

const getVisitors=async(req,res)=>{
    try{
        const visitors=await Visitor.find().sort({createdAt:-1});
        res.status(200).json(visitors);
    }
    catch(error){
        res.status(400).json({
            error:error.message
        });
    }
};

//get single visitor

const getVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findById(req.params.id);
        if(!visitor){
            return res.status(404).json({
                error:"visitor not found"
            });
        }
        res.status(200).json(visitor);
    }
    catch(error){
        res.status(400).json({
            error:error.message
        });
    }
}

//update visitor

const updateVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
    if(!visitor){
            return res.status(404).json({
                error:"visitor not found"
            });
        }
        res.status(200).json(visitor);
    }
    catch(error){
        res.status(400).json({
            error:error.message
        });
    }
}

//delete visitor

const deleteVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) {
            return res.status(404).json({
                error: "Visitor not found"
            });
        }

        res.status(200).json({
            message: "Visitor deleted successfully"
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });
}
}

module.exports={
    createVisitor,
    getVisitors,
    getVisitor,
    updateVisitor,
    deleteVisitor
};