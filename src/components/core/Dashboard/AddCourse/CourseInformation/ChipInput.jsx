import React,{useState,useEffect} from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from "react-redux";

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,

}) => {

  const {editCourse,course} = useSelector((state)=>state.course);

  const [chips, setChips] = useState([]);

  useEffect(()=>{

    if(editCourse){
        setChips(course?.tag)
    }

  register(name, {
    required:true,
    validate: (value)=> value.length > 0
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  },[]);

  useEffect(()=>{
    setValue(name,chips);
     // eslint-disable-next-line react-hooks/exhaustive-deps

  },[chips]);

//   Function to handle when user input when chips are added

 const handleKeyDown = (event) =>{

    //check if user presses "Enter or ","
    if(event.key === "Enter" || event.key === ","){

        //Prevent the default behaviour of the event
        event.preventDefault();

        //Get the input value and remove any leading / trailing spaces
        const chipValue =  event.target.value.trim();

        //check if the input values exists and is not already in the chips array

        if(chipValue && !chips.includes(chipValue)){

            //Add the chip to the array and clear the input
            const newChips = [...chips, chipValue];
            setChips(newChips);
            event.target.value = ""
        }
    }
 }

 //Function to handle deletion of the chips
 const handleDeleteChip = (chipIndex)=>{

    //Filters the chips array to remove the chips with given index
    const newChips = chips.filter((_,index) => index !== chipIndex)
    setChips(newChips);
    
 }

  return (
    <div>
        <label
        htmlFor={name}
        className='text-sm text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
       
        {/* render chips(tags) and input */}
        <div className='flex w-full flex-wrap gap-y-2'>
            {   
                chips.map((chip, index)=>(

                    <div key={index}
                    className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>

                        {/* Render chip value */}
                        {chip}

                        {/* Render button to delete chip */}
                        <button
                        type="button"
                        className='ml-2 focus:outline-none'
                        onClick={()=> handleDeleteChip(index)}>
                            <MdClose className='text-sm'/>
                        </button>

                    </div>
                    
                ))

            }

            <input 
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='form-style w-full'
            />

        </div>

        {
            errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Tags is required
                </span>
            )
        }
    </div>
  )
}

export default ChipInput