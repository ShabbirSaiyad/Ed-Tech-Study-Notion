const User = require('../model/User');
const Profile = require('../model/Profile');
const OTP = require('../model/OTP');
const otpGenerator  =  require('otp-generator');
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


//send OTP
exports.sendOTP =  async(req,res)=>{
    try{
         
        //fetch email from request ki body
        const {email} = req.body;

        //check if the user is already present or not
        const checkUserPresent = await User.findOne({email});

        //if user already exist then return response
        if(checkUserPresent){
            //Return 401 unauthorised status code with error message
            return res.status(401).json({
            success:false,
            message:"User already registered"
            });
        }

        //generate otp
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated : ", otp);

        //check unique otp or not
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                
            });
            
            //check unique otp or not
            result = await OTP.findOne({otp:otp});

        }
          
        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);
        console.log("OTP body : ",otpBody);

        //return response successfully
        res.status(200).json({
            success:true,
            message:"OTP send successfully.",
            otp,
        });


    }catch(error){

      console.log("I AM IN AUTH : ",error);
      return res.status(500).json({
       success:false,
       message:error.message,
      });

    }


}

//Sign up controller for registering users
exports.signup = async(req,res)=>{
    try{
         //fetch data
         const {firstName,
                lastName,
                email,
                password,
                accountType,
                confirmPassword,
                // contactNumber,
                otp  } = req.body;

         //validate data
         if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
         }
          
        //  check password and confirmPassword dono match ho rahe he ki nai
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password fields are not same, please try again",
            })
        }

         //check if user already exists or not
         const existingUsers = await User.findOne({email});

         if(existingUsers){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            });
         }

         //find most recent otp stored in db
         const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
         console.log("recent otp : ", recentOtp);
        
         //validate otp
         if(recentOtp.length == 0){
            //otp not found
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
         }else if(otp !== recentOtp[0].otp){
            //Invalid
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
         }
         
         //hash password
         const hashedPassword = await bcrypt.hash(password,10);

         //create AdditonalDetails  entry in user schema db

         const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         })
         
         const user = await User.create({
            firstName,
            lastName,
            email,
            // contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
         });

         //return res
         return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user,
         });

    }catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again",
           });
    }
}

//login
exports.login = async(req,res)=>{
    try{
          //fetch data from req body
          const {email,password} = req.body;

          //validate data whether email or password is missing or not
          if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details",
            })
          }

          //user exist or not
          const user = await User.findOne({email}).populate("additionalDetails");

          if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered. Please sign up first to continue",
            });
          }

          //generate jwt,after password matching
          if(await bcrypt.compare(password,user.password)){
            
            const payload = {
                email: user.email,
                id : user._id,
                accountType: user.accountType,
            }
            let token = jwt.sign(
                payload, 
                process.env.JWT_SECRET,{
                expiresIn: '36h',
            });

            //save the token to user document in database
            user.token = token;
            user.password = undefined;

          //create cookies and send responses
          const options = {
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
          }
         
          //set cookies and return response
          res.cookie("token",token,options).status(200).json({
              success:true,
              token,
              user,
              message:"Login successfully",
          });
        
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        }


    }catch(error){
        console.log(error);
        return res.status(200).json({
            success:false,
            message: "Login failure,please try again",
        });
    }
}

//changePassword
exports.changePassword = async(req,res)=>{
    try{
         //get data from req.user
         const userDetails = await User.findById(req.user.id);

         //get oldPassword , newPassword,confirmNewPassword from req.body
         const {oldPassword, newPassword} = req.body;

         //validate old password
         const isPasswordMatch =  await bcrypt.compare(oldPassword,userDetails.password);

         if(!isPasswordMatch){
            //if password does not match,401 unauthorised error
            return res.status(401).json({
                success:false,
                message:"Password is wrong",
            });
         }


        //update password in db
       const encryptedPassword = await bcrypt.hash(newPassword, 10);

       const updatedUserDetails =  await User.findByIdAndUpdate(
        req.user.id,
        {password : encryptedPassword },
        {new : true},
       )
         
        //send email of Password updated
        try{
            const emailResponse =  await mailSender(   updatedUserDetails.email ,
                "Password for your account has been updated ",    
                passwordUpdated(
                    updatedUserDetails.email, 
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)
            );


            console.log("Email sent successfully for change  : ",emailResponse.response);


        }catch(error){
          //If there is an error sending the email,log the error and return 500(Internal error)
          console.error("Error occurred while sending email for changing password : ",error);

          return res.status(500).json({
            success:false,
            message:"Error occured while sending email",
            error: error.message,
          });

        }

        //  return response
        return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });

    }catch(error){

        console.error("Error occurred while updating password:", error);

        return res.status(500).json({
          success: false,
          message: "Error occurred while updating password",
          error: error.message,
        });
    }
}