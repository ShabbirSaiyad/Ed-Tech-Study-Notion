import React from 'react'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='text-white'>

            <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>

            {/* Part1 */}
            <div className='flex flex-row justify-between bg-richblack-800 p-8 px-12 border-[1px] border-richblack-700 rounded-md'>

                <div className='flex flex-row gap-x-6'>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />

                    <div className="space-y-1">

                        <p className="text-lg font-semibold text-richblack-5" >{user?.firstName} {" "} {user?.lastName}</p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>

                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}>
                    <RiEditBoxLine />
                </IconBtn>

            </div>

            {/* Part2 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <div className='flex items-center justify-between'>

                    <p className="text-lg font-semibold text-richblack-5">About</p>

                    <IconBtn
                        text="Edit" onclick={() => { navigate("/dashboard/settings") }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>

                </div>

                <p
                    className={`${user?.additionalDetails?.about
                        ? "text-richblack-5"
                        : "text-richblack-400"
                        } text-sm font-medium`}
                >
                    {user?.additionalDetails?.about ?? "Write something about yourself"}
                </p>

            </div>

            {/* Part3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <div className='flex w-full items-center justify-between'>

                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>

                    <IconBtn
                        text="Edit"
                        onclick={() => { navigate("/dashboard/settings") }}>

                        <RiEditBoxLine />

                    </IconBtn>
                </div>


                <div className="flex max-w-[500px] justify-between">

                    {/* Left Part */}
                    <div className="flex flex-col gap-y-5">

                        {/* First Name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p>{user?.firstName}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>

                            <p className="text-sm font-medium text-richblack-5">{user?.email}</p>

                        </div>

                        {/* Gender */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add gender"}</p>
                        </div>

                    </div>
                    
                    {/* Right Part */}
                    <div className="flex flex-col gap-y-5">
                        
                        {/* LastName */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                        </div>

                        {/* Contact Number */}
                        <div >
                            <p className="mb-2 text-sm text-richblack-600">Phone no</p>
                            <p>{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
                        </div>

                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default MyProfile