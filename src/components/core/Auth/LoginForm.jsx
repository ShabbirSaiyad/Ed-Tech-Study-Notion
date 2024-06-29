import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from '../../../services/Operations/authAPI';

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name] : e.target.value
    }))

  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password, navigate)) 
    console.log("Login done : ",formData);
  }

  return (
       <form onSubmit={submitHandler} className='w-full mt-6 flex gap-y-3 flex-col'>
        <label className='w-full'>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className='text-pink-200'>*</sup></p>
          <input
            onChange={onChangeHandler}
            required
            type="text"
            name="email"
            value={email}
            placeholder='Enter your email address'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" />
        </label>

        <label className='relative'>

          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password<sup className='text-pink-200'>*</sup></p>

          <input
            onChange={onChangeHandler}
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder='Enter your password'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" />

            <span 
            className="absolute right-3 top-[39px] z-[10] cursor-pointer"
            onClick={()=> setShowPassword((prev)=>!prev)}>
              {
                showPassword ? (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24}/>)
                : (<AiOutlineEye fill="#AFB2BF" fontSize={24}/>)
              }

            </span>
            
            <Link to="/forgot-password">

            <p className='text-blue-100 mt-1 max-w-max ml-auto text-xs '>Forget Password</p>

            </Link>

            <button 
            type="submit"
            className="bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 rounded-[8px] mt-6">Sign in</button>

        </label>
      </form>

  )
}

export default LoginForm