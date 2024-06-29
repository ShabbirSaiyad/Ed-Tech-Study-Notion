const jwt = require("jsonwebtoken");
const User = require('../model/User');
require('dotenv').config();


//auth
exports.auth = async(req,res,next)=>{
    try{
         //extract token
         const token = req.cookies.token
                         || req.body.token
                         || req.header("Authorization").replace("Bearer ","");

        // if token is missing ,then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){

            //verification is invalid
            console.log("Verification error in auth",error);
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            });
        }
        next();
                        
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating token',
        });

    }
}

//isStudent
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected routes for student only",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again ",
        });
    }
}

//isInstructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected routes for Instructor only",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified Please try again ",
        });
    }
}

//isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected routes for Admin only",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, Please try again ",
        });
    }
}