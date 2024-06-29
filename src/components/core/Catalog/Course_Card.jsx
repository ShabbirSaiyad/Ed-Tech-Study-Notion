import React,{useState,useEffect} from 'react';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRatings';

const Course_Card = ({course, Height}) => {

    const [avgRatingCount,setAvgRatingCount] = useState(0);

    useEffect(()=>{
        const count  = GetAvgRating(course.ratingAndReviews);
        setAvgRatingCount(count);

    },[course])
  return (
    <div>

        <Link to={`/course/${course._id}`}>

        <div>
            <div className="rounded-lg">
                <img 
                src={course.thumbnails}
                className={`${Height} w-full rounded-xl object-cover`}
                />
            </div>

            <div className="flex flex-col gap-2 px-1 py-3">
                <p className="text-xl text-richblack-5">{course?.courseName}</p>
                <p  className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgRatingCount || 0}</span>
                    <RatingStars Review_Count={avgRatingCount}/>
                    <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                </div>
                <p className="text-xl text-richblack-5">{course?.price}</p>
            </div>
        </div>
        
        </Link>
    </div>
  )
}

export default Course_Card