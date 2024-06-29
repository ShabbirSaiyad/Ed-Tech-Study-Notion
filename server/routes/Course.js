const express = require('express');
const router = express.Router();

//course controller import
const {createCourse, getAllCourses, getCourseDetails, editCourse,getInstructorCourses,getFullCourseDetails ,deleteCourse} = require('../controller/Course');

//category controller import
const {createCategory, categoryPageDetails, showAllCategories} = require('../controller/Category');

//section controller import
const {createSection, updateSection, deleteSection } = require('../controller/Section');

//Subsection controller import
const {createSubSection, updateSubSection, deleteSubSection } = require('../controller/SubSection');

//Rating controller import
const {createRating,getAverageRating,getAllRating } = require('../controller/RatingAndReview');

//importing middlewares
const {auth,isStudent,isAdmin,isInstructor} = require('../middleware/auth');


//********************************************************************************** */
//                                  Course routes
//********************************************************************************** */

//Course can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse);

// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

//Get all instructors courses
router.get("/getInstructorCourses",auth, isInstructor,getInstructorCourses)

//Get full details
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// Delete a Course
router.delete("/deleteCourse", deleteCourse)

//Get a single course by course id
router.get("/getCourseDetails",getCourseDetails);

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);

//Add section to a course
router.post("/addSection",auth,isInstructor,createSection);

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails)


//********************************************************************************** */
//                            Rating And Reviews
//********************************************************************************** */

router.post("/createRating",auth,isStudent, createRating);
router.get("/getAverageRating" , getAverageRating);
router.get("/getReviews" , getAllRating);

module.exports = router;