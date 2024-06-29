import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation'

import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {
  return (
    <>
    {
        Courses?.length? (
            <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation={true}
            className="max-h-[30rem]"
            >
                {
                    Courses.map((course,index)=>(
                        <SwiperSlide key={index}>
                            <Course_Card course={course} Height={"h-[250px]"}/>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        ) :(<p className="text-xl text-richblack-5">No course found</p>)
    }
    </>
   
  )
}

export default CourseSlider