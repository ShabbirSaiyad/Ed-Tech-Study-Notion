const User = require('../model/User');
const Category = require('../model/Category');
const Course = require('../model/Course');
const Section = require('../model/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const SubSection = require('../model/SubSection');
const CourseProgress = require('../model/CourseProgress');
const { convertSecondsToDuration } = require("../utils/secToDuration")
require('dotenv').config();


//create course handler
exports.createCourse = async (req, res) => {
      try {
            //fetch data
            const { courseName,
                  courseDescription,
                  whatYouWillLearn,
                  price,
                  category,
                  tag: _tag,
                  status,
                  instructions: _instructions,
            } = req.body;

            //get thumbnails
            const thumbnails = req.files.thumbnailImage;

            //convert tag and instruction from stringified array to array
            const tag = JSON.parse(_tag);
            const instructions = JSON.parse(_instructions);

            console.log("Tag : ", tag);
            console.log("Instructions : ", instructions);
            // console.log("CourseName : ", courseName);
            // console.log("courseDescription : ", courseDescription);
            // console.log(" whatYouWillLearn : ",  whatYouWillLearn);
            // console.log("price : ", price);
            // console.log("category : ", category);
            // console.log("status : ", status);
            // console.log("Image" ,thumbnails);



            //Validation
            if (!courseName ||
                  !courseDescription ||
                  !whatYouWillLearn ||
                  !price ||
                  !category ||
                  !thumbnails ||
                  !tag.length ||
                  !instructions.length
            ) {
                  return res.status(400).json({
                        success: false,
                        message: "Fill all the details",
                  });
            }

            //Add draft as status when creating course if status is null or undefined
            if (!status || status === undefined) {
                  status = "Draft"
            }

            //check for instructor
            //todo: USERiD AND instructordetails are same or different
            const userId = req.user.id;
            const instructorDetails = await User.findById(userId, {
                  accountType: 'Instructor',
            });

            console.log("Instructor details : ", instructorDetails);

            if (!instructorDetails) {

                  return res.status(404).json({
                        success: false,
                        message: "Instructor details not found",
                  });
            }

            //check category is valid or not
            const CategoryDetails = await Category.findById(category);

            if (!CategoryDetails) {
                  return res.status(404).json({
                        success: false,
                        message: "Category details not found",
                  });
            }

            //upload image in cloudinary
            const thumbnailImage = await uploadImageToCloudinary(thumbnails, process.env.FOLDER_NAME);

            console.log("Thumbnail image : ", thumbnailImage);

            //create an entry for new course
            const newCourse = await Course.create({
                  courseName,
                  courseDescription,
                  instructor: instructorDetails._id,
                  whatYouWillLearn: whatYouWillLearn,
                  price,
                  category: CategoryDetails._id,
                  thumbnails: thumbnailImage.secure_url,
                  tag,
                  instructions,
                  status: status,

            })

            //add new course id to the user schema of instructors
            await User.findByIdAndUpdate(
                  { _id: instructorDetails._id },
                  {
                        $push: {
                              courses: newCourse._id,
                        }
                  },
                  { new: true },
            );

            //update the category ka schema
            const updatedCategory = await Category.findByIdAndUpdate(
                  { _id: category },
                  {
                        $push: {
                              courses: newCourse._id,
                        }
                  },
                  { new: true },
            )
            console.log("Jab naya course banega to category me update kiya : ", updatedCategory);

            //return response
            return res.status(200).json({
                  success: true,
                  message: "Course created successfully",
                  data: newCourse,
            });

      } catch (error) {
            console.error(error);
            return res.status(500).json({
                  success: false,
                  message: "Failed to create a course",
                  error: error.message,
            });
      }
}

//Edit courses
exports.editCourse = async (req, res) => {
      try {
            //fetch course Id from req.body
            const { courseId } = req.body;

            const updates = req.body;

            const course = await Course.findById(courseId);

            if (!course) {
                  return res.status(404).json({
                        success: false,
                        message: "Course is not found",
                  });
            }

            //if thumbnail image is present update it
            if (req.files) {
                  const thumbnail = req.files.thumbnailImage;
                  const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

                  course.thumbnails = thumbnailImage.secure_url;
            }

            //Update only those field that are present in req.body
            for (const key in updates) {
                  if (updates.hasOwnProperty(key)) {
                        if (key == "tag" || key == "instructions") {
                              course[key] = JSON.parse(updates[key]);
                        }
                        else {
                              course[key] = updates[key];
                        }
                  }
            }

            await course.save()

            const updatedCourse = await Course.findOne({
                  _id: courseId,
            })
                  .populate({
                        path: "instructor",
                        populate: {
                              path: "additionalDetails",
                        },
                  })
                  .populate("category")
                  .populate("ratingAndReviews")
                  .populate({
                        path: "courseContent",
                        populate: {
                              path: "subSection",
                        },
                  })
                  .exec()

            res.json({
                  success: true,
                  message: "Course updated successfully",
                  data: updatedCourse,
            });

      } catch (error) {
            console.log(error);
            return res.status(500).json({
                  success: false,
                  message: "Error while editing course"

            })
      }
}

//get all the course handler function
exports.getAllCourses = async (req, res) => {
      try {
            const allCourses = await Course.find(
                  // {status : "Published"},
                  {},
                  {
                        courseName: true,
                        price: true,
                        thumbnails: true,
                        ratingAndReviews: true,
                        studentsEnrolled: true,
                  })
                  .populate("instructor")
                  .exec();

            return res.status(200).json({
                  success: true,
                  message: "Data for all courses are fetched successfully",
                  data: allCourses,
            })
      } catch (error) {
            console.error(error);
            return res.status(500).json({
                  success: false,
                  message: "Failed to show all courses",
                  error: error.message,
            });
      }
}

//get a single course details with course id
exports.getCourseDetails = async (req, res) => {
      try {
            //get id
            const { courseId } = req.body;
            //find courseDetails
            const courseDetails = await Course.find(
                  { _id: courseId },
            )
                  .populate(
                        {
                              path: "instructor",
                              populate: {
                                    path: "additionalDetails"
                              },
                        }
                  )
                  .populate("category")
                  .populate("ratingAndReviews")
                  .populate({
                        path: "courseContent",
                        populate: {
                              path: "subSection",
                        }
                  })
                  .exec();

            //validaiton
            if (!courseDetails) {
                  return res.status(400).json({
                        success: false,
                        message: `Could not find the course with ${courseId}`,
                  });
            }

            //return response
            return res.status(200).json({
                  success: true,
                  message: "Course details fetched successfully",
                  data: courseDetails,
            })

      } catch (error) {
            console.log(error);

            return res.status(500).json({
                  success: false,
                  message: error.message,
            });
      }

}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
      try {

            //get instructor id from authenticated user or request body
            const instructorId = req.user.id;

            //Find all the course
            const instructorCourses = await Course.find({
                  instructor: instructorId,
            }).sort({ createdAt: -1 });

            // Return the instructor's courses
            res.status(200).json({
                  success: true,
                  data: instructorCourses,
            })

      } catch (error) {
            console.log(error);
          return  res.status(500).json({
                  success: false,
                  message: "Failed to get all the Instructor's course",
                  error: error.message
            })
      }
}

//Delete Course
exports.deleteCourse =  async(req,res)=>{
      try{
            //Fetch courseId from req.body
            const {courseId} =  req.body;
            
            //Find course by courseId
            const course = await Course.findById(courseId);

            if(!course){
                  return res.status(404).json({message:"Course Not found"});
            }

            //unenrolled student from studentsEnrolled array in course
            const studentsEnrolled = course.studentsEnrolled;
            for(const studentId of studentsEnrolled){
                  await User.findByIdAndUpdate(studentId,{
                        $pull: {courses : courseId}
                  })
            }

            //Delete section and sub-section
            const courseSection =  course.courseContent;
            for( const sectionId of courseSection){

                  const section = await Section.findById(sectionId);

                  // Delete subSection if exist
                  if(section){
                        const subSection = section.subSection;

                        for(const subSectionId of subSection){
                              await SubSection.findByIdAndDelete(subSectionId)
                        }
                  }

                  // Delete the section
                   await Section.findByIdAndDelete(sectionId);
            }

            // Delete the course
            await Course.findByIdAndDelete(courseId)

            return res.status(200).json({
                  success: true,
                  message: "Course deleted successfully",
            });

      }catch(error){
            console.log(error);
            return res.status(500).json({
                  success:false,
                  message:'Error in deleting the course',
                  error:error.message
            })
      }
}

//Get full course details
exports.getFullCourseDetails = async(req,res)=>{
      try{
            const {courseId} = req.body;
            const userId = req.user.id;

            const courseDetails = await Course.findOne({
                  _id : courseId
            })
            .populate({
                  path:'instructor',
                  populate:{
                        path:"additionalDetails"
                  }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                  path:'courseContent',
                  populate:{
                        path:'subSection'
                  }
            })
            .exec()

            let courseProgressCount = await CourseProgress.findOne({
                  courseID:courseId,
                  userId : userId
            })

            console.log("courseProgressCount : ", courseProgressCount)

            if (!courseDetails) {
                  return res.status(400).json({
                    success: false,
                    message: `Could not find course with id: ${courseId}`,
                  })
                }
            
            let totalDurationInSeconds = 0;

            courseDetails.courseContent.forEach((content)=>{
                  content.subSection.forEach((subSection)=>{
                        const timeDurationInSeconds = parseInt(subSection.timeDuration);
                        totalDurationInSeconds += timeDurationInSeconds
                  })
            })

            const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

            return res.status(200).json({
                  success : true,
                  data: {
                        courseDetails,
                        totalDuration,
                        completedVideos : courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos
                        : [],
                  }

            })


      
      }catch(error){
            console.error(error);
            return res.status(500).json({
                  success:false,
                  message:'Unable to get full course details',
                  error:error.message
            })
      }
}