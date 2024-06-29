import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/Operations/authAPI';
import { BiArrowBack } from "react-icons/bi";

const UpdatePassword = () => {
    const {loading} = useSelector((state)=>state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [formData, setFormData] =  useState({
        password:"",
        confirmPassword:""
    });
    const dispatch = useDispatch();
    const location =  useLocation();

    const {password, confirmPassword } = formData;


    const onChangeHandler = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] :  e.target.value
            }
        ))
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword,token))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
        loading ? (
        <div className="spinner"></div>
        ) :
        (
            <div className="max-w-[500px] p-4 lg:p-8">

                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password. You are all set.</p>

                <form onSubmit={submitHandler}>
                        <label className='relative'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password<sup className='text-pink-200'>*</sup></p>

                            <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={onChangeHandler}
                            placeholder='Enter your new password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="form-style w-full !pr-10"
                            />

                            <span
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24} />)
                                    : (<AiOutlineEye fill="#AFB2BF" fontSize={24} />)
                            }

                        </span>
                            
                         </label>

                         {/* confirmPassword */}

                         <label className='relative mt-3 block'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password<sup className='text-pink-200'>*</sup></p>

                            <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChangeHandler}
                            placeholder='Enter your confirm password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="form-style w-full !pr-10"
                            />

                            <span
                            className="absolute right-3 top-[39px] z-[10] cursor-pointer"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword ? (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24} />)
                                    : (<AiOutlineEye fill="#AFB2BF" fontSize={24} />)
                            }

                        </span>
                            
                         </label>

                         <button type="submit" className="bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 rounded-[8px] mt-6">
                        Reset Password
                            
                        </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5"> <BiArrowBack /> Back to login</p>
                    </Link> 
                </div>

           </div>
        )
    }
    </div>
    
    
  )
}

export default UpdatePassword