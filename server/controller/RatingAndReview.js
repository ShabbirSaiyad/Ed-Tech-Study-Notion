const RatingAndReview  = require('../model/RatingAndReview');
const Course = require('../model/Course');
const { default: mongoose } = require('mongoose');


//createRating
exports.createRating = async(req,res)=>{
   try{
    //get user id
    const userId  =  req.user.id;

    //fetch datafrom req.body
    const {rating,review,courseId} = req.body;

    //check if user is enrolled or not
    const courseDetails = await Course.findOne(
        {_id:courseId,
        studentsEnrolled: {$elemMatch : {$eq : userId}},
    });

    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in this course",
        })
    }

    //check if user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
        user:userId,
        course:courseId,
    });

    if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is being reviewed by the user.Only one time review possible.",
        });

    }

    //create rating and review
    const ratingReview = await RatingAndReview.create({
        rating,review,
        course:courseId,
        user:userId,
    });


    // update course schema with rating and review
    const updatedCourseDetails  = await Course.findByIdAndUpdate({_id : courseId} ,
        {
            $push:{
                ratingAndReviews:ratingReview._id,
            }
        },{
            new:true,
        });
       
    console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview,
        });
   }catch(error){
     console.log(error);
    return res.status(500).json({
          success:false,
          message:error.message,
    });
   }
}


//getAverageRatinng
exports.getAverageRating = async(req,res)=>{
    try{
     //get course id
     const courseId  =  req.body.courseId;

     //calculate avg rating
     const result = await RatingAndReview.aggregate([
        {
            $match:{
                course: new mongoose.Types.ObjectId(courseId),
            },
        },{
            $group:{
                _id:null,
                averageRating : { $avg : "$rating"},
            }
        }
     ]);

     if(result.length > 0){
         //return response
         return res.status(200).json({
            success:true,
            averageRating : result[0].averageRating,
        });
        
     }

     //if no rating /review exist 
     return res.status(200).json({
        success:true,
        message:"avg rating is 0 till now",
        averageRating:0,
     })
 
    }catch(error){
     console.log(error);
     return res.status(500).json({
           success:false,
           message:error.message,
     });
    }
 }


//getAllRating
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                 .sort({rating:"desc"})
                                 .populate({
                                    path:"user",
                                    select:"firstName lastName image email"
                                 }) 
                                 .populate({
                                    path:"course",
                                    select:"courseName"
                                 })
                                 .exec();
        return res.status(200).json({
            success:true,
            message:"All review fetched successfully",
            data:allReviews,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
      });
    }
}