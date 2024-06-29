import React, { useRef, useState } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../../../services/Operations/authAPI';
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropDown = () => {
  const {user} = useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  
  const onClickOutsideHandler = ()=>{
    setOpen(false);
  }
  useOnClickOutside(ref, onClickOutsideHandler)
  
  if (!user) return null;

  return (
    <button className="relative" onClick={() => setOpen(true)}>

      <div className='flex items-center gap-x-2'>
        <img 
        src={user?.image}
        alt={`profile-${user?.firstName}`}
        className='aspect-square w-[30px] rounded-full object-cover'/>
        <AiOutlineCaretDown className='text-sm text-richblack-100'/>
      </div>

      {
        open && (

          <div 
          onClick={(e) => e.stopPropagation()}
          className=' absolute top-[118%] right-0 z-[1000]  divide-y-[1px] divide-richblack-700 rounded-md bg-richblack-800 border-[1px] border-richblack-700 overflow-hidden' 
          ref={ref}>
            
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>

              <div className='flex items-center w-full gap-x-3 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>

              <VscDashboard className="text-lg" />
              Dashboard

              </div>

            </Link>
    
              <div 
              onClick={()=>{
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className='flex items-center w-full gap-x-3 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
              <VscSignOut className="text-lg" />
              Log Out
              </div>
  
        </div>
          
        )
      }
     

    </button>
  )
}

export default ProfileDropDown