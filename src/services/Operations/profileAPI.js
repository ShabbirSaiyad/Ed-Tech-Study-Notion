import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

export async function getUserEnrolledCourses(token){
    const toastId =  toast.loading("Loading");
    let result = [];
    const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

    try{
        console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,
        null,
        {
            Authorization : `Bearer ${token}`
        })

        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    );

    if( !response.data.success){
        throw new Error(response.data.message)
    }

    result = response.data.data;


    }catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");

    }

    toast.dismiss(toastId);
    return result;

}