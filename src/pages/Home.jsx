import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Explore from '../components/core/HomePage/Explore';

const Home = () => {
  return (
    <div>
      { /*Section 1*/}

      <div className='relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center justify-between text-white '>

        
          <div className=' group mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none' >
          <Link to={'/signup'}>
            <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </Link>

          </div>

        

        <div className='text-center text-4xl font-semibold mt-8'>
          Empower Your Future with
          <HighlightText text="Coding Skills" />
        </div>

        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>

        </div>

        <div className={'mt-16 mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-11/12'}>
          <video className='shadow-[15px_15px_rgba(255,255,255)]' muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/*Code block 1*/}
        <div className='mt-4'>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold '>
                Unlock your <HighlightText text={'coding potential'} /> with our online courses
              </div>
            }
            subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
            ctabtn1={
              {
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/login",
                active: false
              }
            }
            codeblock={
              `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> \n<a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
            }
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className='codeblock1 absolute'></div>}
          />
        </div>

        {/*Code block 2*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start <HighlightText text={'coding potential'} /> in seconds
              </div>
            }
            subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson`}
            ctabtn1={
              {
                btnText: "Continue learning",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/login",
                active: false
              }
            }
            codeblock={
              `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> \n<a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
            }
            codeColor={"text-white"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}

          />
        </div>

       <Explore/>

      </div>



      { /*Section 2*/}

      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='home_bg lg:h-[310px] h-[120px]' >
          <div className='w-11/12 max-w-maxContent flex  flex-col justify-betwwen items-center gap-5 mx-auto'>

            <div className='md:h-[20px] lg:h-[210px]'></div>

            <div className='flex flex-row gap-7 text-white '>

              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore full catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>

            </div>


          </div>

        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center  justify-between gap-7 mb-10 mt-[90px]'>

        <div className='mb-10 mt-[-60px] flex flex-col justify-between mx-auto lg:flex-row gap-7 lg:gap-5 lg:mt-4'>

            <div className='text-4xl font-semibold lg:w-[45%]'>
              Get the skills you need for a <HighlightText text={"Job that is in demand"} />
            </div>
            
            <div className='flex flex-col  gap-5 lg:w-[40%] items-start'>
              <div className='text-[15px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
              
            <CTAButton active={true} linkto={"/signup"}>
              <div>Learn more</div>
            </CTAButton>

            </div>

        </div>

        <TimelineSection/>
        
        <LearningLanguageSection/>

        </div>

      </div>

      { /*Section 3*/}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center bg-richblack-900 text-white'>

       <InstructorSection/>

        <h2 className='font-semibold text-center text-4xl mt-10'>Reviews from other learners</h2>

      </div>


      { /*Section 4*/}
      <Footer />

    </div>


  )
}

export default Home