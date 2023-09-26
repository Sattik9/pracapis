const express=require('express');
const Route=express.Router();
const apiModel=require("../Model/apiModel");
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const imageUpload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        if(file.mimetype=='image/jpg'||
           file.mimetype=='image/png'||
           file.mimetype=='image/jpeg'){
            cb(null,true)
        }
        else{
            cb(null,false)
        }
    }
})

Route.get("/users",async(req,res)=>{
    try{
        const result=await apiModel.find();
        res.status(200).json({
            success:true,
            message:"Data fetched Successfully!",
            data:result
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error",
        })
    }
})

Route.post("/create",imageUpload.single("image"),async(req,res)=>{
    try{
        const filepath=`http://${req.get('host')}/upload/${req.file.filename}`;
        const result=new apiModel({
              name:req.body.name,
              email:req.body.email,
              city:req.body.city,
              image:filepath
        })
        const output=await result.save();
        res.status(200).json({
            success:true,
            message:"Creation is successful!",
            data:result
        })
    }
    catch(error){
          res.status(422).send({message:error.message});
    }
})

Route.put("/update/:id",imageUpload.single("image"),async(req,res)=>{
    try{
        const filepath=`http://${req.get('host')}/update/${req.file.filename}`;
       await apiModel.findById(req.params.id)
       .then((result)=>{
        result.name=req.body.name;
        result.email=req.body.email;
        result.city=req.body.city;
        result.image=filepath;
        result.save().then(()=>{
            res.status(200).json({
                success:true,
                message:'data updated successfully!',
                data:result
            })
        })
       })
    }
    catch(error){
        res.status(422).send({message:error.message});
    }
})

Route.delete("/delete/:id",async(req,res)=>{
    await apiModel.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.status(200).json({
            success:true,
            message:"deletion is successful!"
        })
    })
    .catch(()=>{
        res.status(400).json({
            success:false,
            message:"error"
        })
    })
})
module.exports=Route;