const User = require('../model/User');
const mailSender = require('../utils/mailSender');
const bcrypt =  require('bcrypt');
const crypto =  require('crypto');

//ResetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    try{
        //get email from req.body
        const {email} = req.body;

        //check the user for this email, email verification
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:`This email ${ email } is not registered with us`
            })
        }

        //generate token 
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expires time of token
        const updateDetails = await User.findOneAndUpdate({email:email},
            {
            token:token,
            resetPasswordExpires: Date.now() + 3600000,
            },
            {new:true});
        console.log("updated details with reset token : ",updateDetails);

        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send email containing url
        await mailSender(email,"Password Reset Link",`Please click on link to reset your password : ${url}`);

        //return response
        return res.json({
            success:true,
            message:"Email send successfully for reseting password token, Please check email and change password"
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resetting password',
        });
    }

}

//resetPassword
exports.resetPassword = async(req, res)=>{
    try{
           //data fetch
           const {password,confirmPassword, token} = req.body;
           //validation
           if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching",
            });
           }

           //get user details from db using token
           const userDetails = await User.findOne({token:token});

           // if no entry - invalid token
           if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            })
           }
           //token time check
           if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired, Please regenerate your token",
            });
           }
           //hash password
           const hashedPassword = await bcrypt.hash(password,10);

           //password update
           await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true});

        //    return response
         return res.status(200).json({
            success:true,
            message:"Reset password done successfully",
         })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting password',
        });

    }
}