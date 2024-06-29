import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const TimelineSection = () => {

  const timeline = [
    {
      logo: Logo1,
      heading: "Leadership",
      desc: "Fully committed to the success company",
    },
    {
      logo: Logo2,
      heading: "Responsibility",
      desc: "Students will always be our top priority",
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      desc: "The ability to switch is an important skills",
    },
    {
      logo: Logo4,
      heading:"Solve the problem",
      desc: "Code your way to a solution",
    }
  ]
  return (
    <div>

      <div className='flex flex-col lg:flex-row gap-16 items-center mt-[25px]'>
        
        {/* left */}
        <div className='flex flex-col lg:w-[45%] gap-14 lg:gap-3'>
          {
            timeline.map((element, index) => {
              return (
                <div className='flex flex-col lg:gap-3' key={index}>

                  <div className='flex flex-row  gap-6' key = {index}>

                    <div className='w-[52px] h-[52px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]'>
                      <img src={element.logo} alt="logoImg"></img>
                    </div>

                    <div className='flex flex-col'>
                      <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                      <p className='text-base'>{element.desc}</p>
                    </div>

                  </div>

                  {/* Vertical dotted line */}
                  <div className={` hidden ${timeline.length - 1 === index ? "hidden" :"lg:block"} h-6 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>

                  </div>

                </div>

                )

            })

          }

        </div>

       {/* right */}
        <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>

          <img src={timelineImage} alt="TimelineImage" className='h-fit object-cover shadow-white shadow-[10px_10px_0px_0px]'/>
          
          <div className='absolute flex flex-col gap-6 lg:flex-row text-white  uppercase py-7 bg-caribbeangreen-700 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:w-[422.3px] w-full'>

            <div className='flex flex-row gap-16 lg:gap-5 lg:border-r border-caribbeangreen-300 items-center px-7'>
              <div> <p className='text-3xl font-bold '>10</p></div>
              <div><p className='text-sm text-caribbeangreen-300'>Years of learning experience</p></div>
               
            </div>
            <div className='flex flex-row gap-12 lg:gap-5 items-center px-7'>
              <div><p className='text-3xl font-bold'>250</p></div>
               <div><p className='text-sm text-caribbeangreen-300'>Types of courses</p></div>
               
            </div>

          </div>
        </div>

      </div>
    </div>
        )
}

        export default TimelineSection