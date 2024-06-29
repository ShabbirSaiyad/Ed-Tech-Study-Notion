import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa6';

const InstructorSection = () => {
    return (
        <div className='mt-16'>
            <div className='flex flex-col lg:flex-row items-center gap-20'>

                <div className='lg:w-[50%]'>

                    <img src={Instructor} alt="InstructorSectionImg"
                    className="shadow-white shadow-[-10px_-10px_0_0]"/>
                </div>

                <div className='flex flex-col gap-10'>
                    <div className='text-4xl font-semibold lg:w-[50%]'>
                        Become an
                        <HighlightText text={"instructor"} />
                    </div>

                    <div>
                        <p className='font-medium text-[16px] lg:w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    </div>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-6'>
                                Start teaching today
                                 <FaArrowRight/> 
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InstructorSection