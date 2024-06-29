const  mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailVerificationTemplate = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }

});

// a function to send mail
async function sendVerificationEmail(email,otp){
    try{
       const mailResponse = await mailSender(email, "Verification email send by StudyNotion",emailVerificationTemplate(otp));
       console.log("Email sent successfully : ",mailResponse.response);

    }catch(error){
        console.log("error occured while sending mail : ",error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    console.log("Verfication mail for otp : ");
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
    
})

module.exports = mongoose.model("OTP",otpSchema);