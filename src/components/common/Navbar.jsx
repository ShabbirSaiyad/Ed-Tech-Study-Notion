import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { ACCOUNT_TYPE } from "../../utils/constants"

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python"
//   },
//   {
//     title: "webdev",
//     link: "/catalog/development"
//   },
// ];

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async() => {
    try {

      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Printing subLinks result ", result);

      setSubLinks( result.data.allCategory);

    } catch (error) {

      console.log("Could not fetch category list");

    }
       setLoading(false);

  }

  useEffect(() => {
    fetchSublinks();
  }, []);


  //Matching the routes to show active navbar.We are matching 
  // route(/home) is compared with (http://localhost:3000/home)
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div 
    className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800" : ""
    } transition-all duration-200`}>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* image */}
        <Link to="/">
          <img src={logo} width={160} alt="logo" height={42} loading='lazy' />
        </Link>

        {/* NavLink */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {
              NavbarLinks.map((link, index) => {
                return <li key={index}>
                  {link.title === "Catalog" ? (
                    <div  className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}>

                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                        </div>

                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                           
                            {subLinks
                              ?.map((subLink, i) => (
                                <Link
                                key={i}
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) 

                          : (<div>  <p className="text-center">No Courses Found</p> </div>)
                      }

                      </div>


                    </div>
                  ) :
                    (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link?.title}</p>
                      </Link>
                    )
                  }

                </li>
              })
            }

          </ul>
        </nav>

        {/* Login/Signup/dashboard */}
        <div className='flex gap-x-4 items-center'>

          {

            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart className='text-white' />
                {
                  totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )
                }

              </Link>
            )

          }
          {
            token === null && (
              <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Log in</button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Sign Up</button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }


        </div>

      </div>

    </div>
  )
}

export default Navbar