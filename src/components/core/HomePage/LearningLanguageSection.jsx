import React from 'react'
import HighlightText from './HighlightText';
import knowProgressImg from '../../../assets/Images/Know_your_progress.png';
import compareWithOtherImg from '../../../assets/Images/Compare_with_others.png';
import planLessonImg from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './Button';

const LearningLanguageSection = () => {
  return (
    <div className= 'my-56 lg:mt-[130px] mb-10'>

      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
           <HighlightText text={"learning any language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base lg:mt-1 lg:w-[70%] font-medium'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center mt-4 lg:mt-0'>
          <img src={knowProgressImg} alt="knowProgressImg" className='object-contain lg:-mr-32'/>
          <img src={compareWithOtherImg} alt="compareWithOtherImg" className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'/>
          <img src={planLessonImg} alt="planLessonImg" className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16'/>

        </div>

       <div className='w-fit lg:mt-8'>
        <CTAButton active={true} linkto={"/signup"}>
              <div>Learn more</div>
        </CTAButton>
       </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection