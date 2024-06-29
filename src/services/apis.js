
const BASE_URL = process.env.REACT_APP_BASE_URL;


//AUTH ENDPOINTS
export const endpoints = {
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup",
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
    RESETPASSWORDTOKEN_API :BASE_URL + "/auth/reset-password-token"
}

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  }


// COURSE ENDPOINTS
export const courseEndpoints = {
    COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    COURSE_CATEGORIES_API : BASE_URL + "/course/showAllCategories",
    GET_ALL_COURSE_API : BASE_URL + "/course/getAllCourses",
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    EDIT_COURSE_API : BASE_URL + "/course/editCourse",
    CREATE_SECTION_API : BASE_URL + "/course/addSection",
    EDIT_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/addSubSection",
    EDIT_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + "/course/getFullCourseDetails",
    CREATE_RATING_API : BASE_URL + "/course/createRating" ,
    LECTURE_COMPLETION_API :BASE_URL + "/course/updateCourseProgress",

}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

//Catalog Page Data
export const catalogData = {
  CATALOGPAGEDATA_API : BASE_URL + "/course/getCategoryPageDetails"

}