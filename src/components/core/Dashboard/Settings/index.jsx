import React from 'react';
import ChangeProfilePicture from './ChangeProfile';
import EditProfile from './EditProfile';

const index = () => {
  return (
    <>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>

    {/* changePictureProfile */}
    <ChangeProfilePicture />

    <div>
      <EditProfile/>
    </div>
    </>
  )
}

export default index