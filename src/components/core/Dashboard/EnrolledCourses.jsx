import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/Operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);

        } catch (error) {
            console.log("Unable to fetch enrolled courses");
        }
    }
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className='text-white'>

            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div className='spinner'></div>) : (
                    !enrolledCourses.length ? (<p>You have not enrolled in any course yet. </p>) :
                        (
                            <div>
                                {/* Heading */}
                                <div>
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>

                                {/* Body */}
                                {
                                    enrolledCourses.map((course, index) => (

                                        <div key={index}>

                                            {/* course Name Part */}
                                            <div>
                                                <img src={course.thumbnails} alt="thumbnailsImg" />

                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>

                                            {/* Duration */}
                                            <div>
                                                {course?.totalDuration}
                                             </div> 

                                             {/* Progress   */}

                                             <div>
                                                <p>Progress : {course.progressPercentage || 0}% </p>
                                                <ProgressBar 
                                                completed={course.progressPercentage || 0} 
                                                isLabelVisible={false}
                                                height="8px"
                                                />
                                             </div>

                                        </div>

                                    ))
                                }


                            </div>
                        )
                )
            }
        </div>
    )
}

export default EnrolledCourses;