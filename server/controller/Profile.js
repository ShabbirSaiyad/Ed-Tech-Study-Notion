const Profile = require('../model/Profile');
const User = require('../model/User');
const Course = require('../model/Course');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.updateProfile = async(req,res)=>{
    try{
        //get data
        const {
            firstName = "",
            lastName = "",
            dateOfBirth="",
            about="",
            contactNumber="",
            gender = ""} = req.body;

        //get userId
        const id = req.user.id;

        //find profile
         const userDetails = await User.findById(id);
         const profileId = userDetails.additionalDetails;
         const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.about = about;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()

        // return profile
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        })

    }catch(error){
      return res.status(500).json({
        success:false,
        error:error.message,
      })
    }
}

//delete account
// explore- how can we schedule a deletion 
exports.deleteAccount = async(req,res)=>{
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById({_id : id});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

    
        //delete profile
        await Profile.findByIdAndDelete(
            {_id : userDetails.additionalDetails});

        // unenroll user from all enrolled courses
        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(
              courseId,
              { $pull: { studentsEnrolled: id } },
              { new: true }
            )
          }
        //delete user
        await User.findByIdAndDelete({_id:id});
        
        //return response
        return res.status(200).json({
            success:true,
            message:"User account deleted successfully. ",
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        });

    }
}


exports.getAllUserDetails = async(req,res)=>{
    try{

        //get user id
        const id = req.user.id;

        //get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User details not found",
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//update profile picture 
exports.updateDisplayPicture = async(req,res)=>{
    try{
        //fetch image file
        const display = req.files.displayPicture;
        console.log("Display picture :",display);

        //fetch user id from req.user
        const userId = req.user.id;
        
        //Upload image to cloudinary
        const image = await uploadImageToCloudinary( display, process.env.FOLDER_NAME, 1000,1000);

        //update User schema in database 
        const updateUser = await User.findByIdAndUpdate(
            { _id : userId},
            {  image: image.secure_url },
            {new : true} );

        console.log("updated user after changing profile Image : ",updateUser);
        
        //return response
        return res.status(200).json({
            success:true,
            message : "Image uploaded successfully",
            data:updateUser,
            // image : image.secure_url,
        });

    }catch(error){
        console.error("Error while changing image : ",error );
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }

}