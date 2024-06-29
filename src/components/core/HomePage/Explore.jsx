import React,{useState} from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const Explore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value );
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

  return (
    <div>
       
            <div className='text-4xl font-semibold text-center my-9 '>
                Unlock the <HighlightText text={"Power of Code"}/>
    
                <p className='text-richblack-300 text-center text-lg font-semibold mt-4'>Learn to build anything you can imagine</p>
            </div>
        
    
        {/* Tab Section */}
        <div className='-mt-4 flex flex-wrap lg:flex-row gap-5 lg:bg-richblack-800  text-richblack-200 mx-auto lg:px-2 lg:py-2 lg:rounded-full drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-12 justify-evenly'>
            {
                tabsName.map((element,index)=>{
                    return (
                        <div 
                        className={`text-[16px] flex flex-row 
                        ${currentTab === element 
                        ? "bg-richblack-900 text-richblcak-5 font-medium"
                        : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer  hover:bg-richblack-900 hover:text-richblack-5 px-6 py-2`
                         }
                         key={index}
                         onClick={()=>setMyCards(element)}
                         >
                            {element}
                        </div>   
                    )
                }
                )
            }
            <div></div>
        </div>

        <div className='lg:h-[150px]'></div>

        {/* course card ka group */}
        <div className='lg:absolute lg:bottom-[0] lg:translate-x-[-50%] lg:translate-y-[50%] lg:left-[50%] flex flex-wrap lg:flex-row gap-10 justify-center lg:justify-between w-full mx-auto lg:mb-0 mb-7 lg:px-0 px-3 mt-16'>
            {
                courses.map((element,index)=>{
                    return (
                        <CourseCard
                        key={index}
                        cardData = {element}
                        currentCard = {currentCard}
                        setCurrentCard = {setCurrentCard}/>
                    );
                })
            }
        </div>

         
        
    </div>
  )
}

export default Explore