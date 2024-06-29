const {instance} = require('../config/razorpay');
const Course = require("../model/Course");
const User =  require('../model/User');
const mailSender =  require("../utils/mailSender");
const courseEnrollmentEmail =  require("../mail/templates/courseEnrollmentEmail");


exports.capturePayment = async(req,res)=>{

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            success:false,
            message:"Please course Id"
        });
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
    }


}



// // capture the payment and initiate the Razorpay order
// exports.capturePayment = async(req,res)=>{
//     try{

//         //get courseid and userid
//         const {courseId} = req.body;
//         const userId = req.user._id;
//         //validation
//         //valid courseid
//         if(!courseId){
//             return res.json({
//                 success:false,
//                 message:'Please provide valid course id',
//             });
//         }
//         //valid coursedetails
//         let course;
//         try{
//            course = await Course.findById(courseId);
//            if(!course){
//             return res.json({
//                 success:false,
//                 message:' could not find course',
//             });
//            }
           
//            //user already pay for the same course
//            const uid =  new mongoose.Types.ObjectId(userId);

//            if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"Student is already enrolled",
//             });
//            }
//         }catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 error:error.message,
//             });

//         }

//         //create order
//         const amount = req.body;
//         const currency = "INR";

//         const options = {
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId,
//             }
//         }


//         try{
//              //initiate the paymment using razorpay
//              const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//              //return response
//              return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnails:course.thumbnails,
//                 orderId : paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount:paymentResponse.amount,

//              })

//         }catch(error){
//             console.log(error);
//             res.json({
//                 success:false,
//                 message:"Could not initaiate order",
//             })
//         }
       
   
//     }catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"Error while creating payment capture",
//         })

//     }
// };



// //verify signature of razorpay and server

// exports.verifySignature = async(req,res)=>{
//     const webhookSecret = "pure";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest =  shasum.digest('hex');

//     if(signature === digest){
//         console.log("Payment is authorised");

//         const {courseId,userId} = req.body.payload.payment.entity.notes;

//         try{
//             //fulfill the actions

//             //find the course and enroll student in it
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
//                 { $push : {studentsEnrolled : userId}},
//                 {new:true});
            
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             }

//             console.log(enrolledCourse);

//             //FIND THE student and aadd course in it
//             const enrolledStudent =  await User.findOneAndUpdate(
//                 {_id : userId},
//                 {$push:{courses:courseId}},
//                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//             //mail send kardo
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from code help",
//                 "Congratulations,you are onboarded on new code help course",
//             );

//             console.log(emailResponse);

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and coourse added",
//             });

//         }catch(error){
//             console.error(error);
//             return res.status(500).json({success:false,
//             message:error.message
//             });
//         }
//     }
//     else{
//         return res.status(500).json({
//             success:false,
//             message:"Invalid request",
//         })
//     }

// }