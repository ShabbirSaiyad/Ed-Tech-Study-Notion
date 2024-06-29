import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from '../../common/Tab';
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from '../../../services/Operations/authAPI';



const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",

    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { firstName, lastName, email, password, confirmPassword } = formData;
    
    // Handle change
    const onChangeHandler = (e) => {
        setformData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    
    //Handle submit
    const submitHandler = (e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            //toast error
            toast.error("Password and Confirm Password does not match");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
          }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))

        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))
        
        //Reset 
        setformData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })

        setAccountType(ACCOUNT_TYPE.STUDENT)


    }

    // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]


    return (
        <div>

            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={submitHandler} className='flex flex-col gap-y-2'>

                <div className='flex flex-row gap-x-4'>
                    <label className='w-full'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            onChange={onChangeHandler}
                            name="firstName"
                            value={firstName}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            placeholder='Enter your first name'
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" />
                    </label>

                    <label className='w-full'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            onChange={onChangeHandler}
                            name="lastName"
                            value={lastName}
                            placeholder="Enter your last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}

                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" />
                    </label>
                </div>

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

                <div className='flex gap-x-4'>

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
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24} />)
                                    : (<AiOutlineEye fill="#AFB2BF" fontSize={24} />)
                            }

                        </span>
                    </label>

                    <label className='relative'>

                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Confirm Password<sup className='text-pink-200'>*</sup></p>

                        <input
                            onChange={onChangeHandler}
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder='Enter your password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" />

                        <span
                            className="absolute right-3 top-[39px] z-[10] cursor-pointer"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword ? (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24} />)
                                    : (<AiOutlineEye fill="#AFB2BF" fontSize={24} />)
                            }

                        </span>
                    </label>

                </div>

                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>


            </form>

        </div>
    )
}

export default SignupForm