import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Countrycode from '../../../../src/data/countrycode.json';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data: ", data);
        try {
            setLoading(true);
            //    const response = await apiConnector("POST",);

            const response = { status: 200 };
            console.log("Logging response ",response);

            setLoading(false);

        } catch (error) {
            console.log("Error in contactUsForm", error.message);

            setLoading(false);

        }

    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",

            })
        }
    }, [reset, isSubmitSuccessful])

    return (

        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-7'>

                {/* First Name - Last Name */}
                <div  className="flex flex-col gap-5 lg:flex-row">

                    {/* firstname */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='firstname' className="lable-style">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            className="form-style"
                            placeholder='Enter first name'
                            {...register("firstname", { required: true })}
                        />{
                            errors.firstname && (
                                <span className="mt-1 text-[12px] text-yellow-100">Please enter your name </span>
                            )
                        }
                    </div>

                    {/* lastname */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor='lastname' className="lable-style">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="form-style"
                                placeholder='Enter last name'
                                {...register("lastname")}
                            />
                        
                    </div>

                </div>

                {/* Email */}
                <div className='flex flex-col'>
                    <label htmlFor='email' className="lable-style">
                        Email Address
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-style"
                        placeholder='Enter your email'
                        {...register("email", { required: true })}
                    />{
                        errors.email && (
                            <span className="mt-1 text-[12px] text-yellow-100">Please enter your email address </span>
                        )
                    }
                </div>

                {/* phoneNo */}
                <div className='flex flex-col gap-2'>
                 
                 <label htmlFor='phonenumber' className="lable-style">Phone Number
                 </label>

                 <div className='flex flex-row gap-5'>
                   {/* Dropdown */}
                    <div className="flex w-[81px] flex-col gap-2">
                    <select name="dropdown" id="dropdown"  className="form-style text-white" {...register("countrycode",{required:true})}>

                    {
                        Countrycode.map((element,index)=>{
                            return (
                                <option key={index} value={element.code}>
                                  {element.code}  -{element.country}  
                                </option>
                            )
                        })
                    }

                    </select>
                    </div>

                    <div  className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input 
                        type="text"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder='12345 6789'
                        className="form-style"
                        { ...register("phoneNo",{
                            required:{value:true,message:"Please enter phone number"},
                            maxLength:{ value:10, message:"Invalid Phone number",
                            minLength:{value:8 ,message:"Invalid Phone Number"}

                        }})}
                        />
                       
                    </div>

                    {
                        errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                 </div>
                        

                 

                </div>

                {/* Message */}
                <div className='flex flex-col'>
                    <label htmlFor='message' className="lable-style">Message</label>
                    <textarea
                        className="form-style"
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder='Enter your message here'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span className="mt-1 text-[12px] text-yellow-100">Please enter your messages</span>
                        )
                    }
                </div>

                <button 
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                 ${
                   !loading &&
                   "transition-all duration-200 hover:scale-95 hover:shadow-none"
                 }  disabled:bg-richblack-500 sm:text-[16px]`} >
                    Send Message
                </button>

            </div>


        </form>
    )
}

export default ContactUsForm