import toast from "react-hot-toast"
import { setToken, setLoading } from "../../slices/authSlice";
import {setUser} from '../../slices/profileSlice';
import {apiConnector} from '../apiconnector';
import { endpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice";


const {
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = endpoints


export function sendOtp(email, navigate){
    return async(dispatch) =>{ 
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", SENDOTP_API , {
                email,
                checkUserPresent : true,
            })

            console.log("SENDOTP API RESPONSE ", response);

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            toast.success("OTP send successfully");
            navigate("/verify-email");

        }catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){      
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{

            const response = await apiConnector("POST",SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE : ", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")

        }catch(error){
            console.log("SIGNUP API ERROR", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}

export function login(email, password, navigate){

    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        
        try{
            const response = await apiConnector("POST",LOGIN_API, {email, password});

            console.log("Login Api response : " ,response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login successful");

            dispatch(setToken(response.data.token));

            const userImage =  response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({...response.data.user, image:userImage}));

            console.log("User in authAPI : ", response.data.user);

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile");

        }catch(error){
            console.log("LOGIN RESPONSE FAILED ERROR : ",error);
            toast.error("Login Failed");

        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
           try{
            const response =  await apiConnector("POST",RESETPASSWORDTOKEN_API, {email});
            console.log("RESET PASSWORD TOKEN : ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset email sent");
            setEmailSent(true);

           }catch(error){
            console.log("Reset Password token error : " , error);
            toast.error("Failed to send email for resetting password")

           }
           dispatch(setLoading(false))
    }

}


export function resetPassword(password, confirmPassword, token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
           try{
            const response =  await apiConnector("POST",RESETPASSWORD_API, {password, confirmPassword,token});
            console.log("RESET PASSWORD RESPONSE : ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset successfully.");
            

           }catch(error){
            console.log("Reset Password error : " , error);
            toast.error("Failed to reset password")

           }
           dispatch(setLoading(false))
    }
     
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully.");
        navigate("/");
    }
}