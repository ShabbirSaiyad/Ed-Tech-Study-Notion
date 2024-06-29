import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import LogoFullLight from '../../assets/Logo/Logo-Full-Light.png';
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links'; 

const Footer = () => {

  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

  const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];

  const Plans = ["Paid memberships", "For students", "Business solutions"];

  const Community = ["Forums", "Chapters", "Events"];

  return (
    <div className='bg-richblack-800'>
        
      {/* Above line */}
      <div className='flex flex-row gap-5 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>

        <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>

          {/* left part */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3" >

            {/* Part1 */}
            <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>
              <img src={LogoFullLight} alt="LogoImg" className='object-contain' />
              <h1 className="text-richblack-50 font-semibold text-[16px]">Company
              </h1>

              <div className='flex flex-col gap-2'>
                {["About", "Careers", "Affiliates"].map((element, index) => {
                  return (
                    <div key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                      <Link to={element.toLowerCase()}>{element}</Link>
                    </div>
                  )
                })

                }

              </div>

              <div className='flex gap-4 text-lg'>
                <BsFacebook className='text-richblack-400 ' />
                <BsGoogle className='text-richblack-400 ' />
                <BsTwitter className='text-richblack-400 ' />
                <BsYoutube className='text-richblack-400 ' />
              </div>
            </div>

            {/* Part2 */}
            <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0"'>

              {/* Resources */}
              <h1 className="text-richblack-50 font-semibold text-[16px]">Resources
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {
                  Resources.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                        <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                      </div>
                    )
                  })
                }
              </div>
              
              {/* Support */}
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>

            </div>

            {/* Part3 */}
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">

              {/* Plans */}
              <h1 className="text-richblack-50 font-semibold text-[16px] ">Plans
              </h1>
              <div className='flex flex-col gap-2 mt-2'>
                {
                  Plans.map((element,index)=>{
                    return(
                      <div key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 "
                      >
                        <Link to={element.split(" ").join("-").toLowerCase}>{element}</Link>
                       </div> 
                    )
                  })
                }
              </div>

              {/* Community */}
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

           
          {/* right part */}
          <div  className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {
              FooterLink2.map((element,index)=>{
                return (

                  <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">

                     {/* Heading */}
                    <h1 className="text-richblack-50 font-semibold text-[16px]">
                      {element.title}
                    </h1>
                    
                    {/* Links */}
                    <div className="flex flex-col gap-2 mt-2">
                      {element.links.map((link, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                          >
                            <Link to={link.link}>{link.title}</Link>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                );
             
              })
            }

          </div>


        </div>

      </div>

      {/* Below line */}
      <div className='flex flex-col lg:flex-row justify-between items-center w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm'>
      
        {/* Bottom Footer */}
        <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full"'> 
         
          <div className="flex flex-row">

            { BottomFooter.map((element,index)=>{

                return(
                  <div
                      key={index}
                      className={` ${
                        BottomFooter.length - 1 === index
                          ? ""
                          : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      } px-3 `}
                    >
                      <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                        {element}
                      </Link>
                  </div>

                )
                
            })}

          </div>

        </div>
          
        
        {/* Made by */}
        <div className="text-center">Made with ❤️ CodeHelp © 2024 Studynotion</div>
        

      </div>


    </div>
  )
}

export default Footer