import { useState } from "react";
import { useForm } from "react-hook-form"



export default function UpdatePassword(){

    const {
        handleSubmit,
        register, 
        formState:{errors} } = useForm()
    
    const [showOldPassword, setShowOldPassword] = useState();
    const [showNewPassword, setShowNewPassword] = useState();

    return(

        <form>

            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

            <div>
                <label>Current Password</label>
                <input/>
            </div>


        </form>
    )
}