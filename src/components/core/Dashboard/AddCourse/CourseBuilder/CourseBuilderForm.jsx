import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/Operations/courseDetailsAPI';
import { setStep ,setEditCourse,setCourse} from '../../../../../slices/courseSlice';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const [editSectionName,setEditSectionName] = useState(null);

  const {course} = useSelector((state) => state.course );

  const dispatch = useDispatch();

  const { token} = useSelector((state)=>state.auth);

  const [loading, setLoading] = useState(false);

  const cancelEdit = ()=>{
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  
  const goBack = ()=>{
   dispatch(setStep(1));
   dispatch(setEditCourse(true))
  }

  const goToNext = ()=>{
    
     if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return
     }

     if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return
     }

     dispatch(setStep(3));
    
  }

  const onSubmit = async(data)=>{
    
    setLoading(true);

    let result;

    if(editSectionName){

      console.log("course in cbf" , course);

      console.log("id", course._id)

      //We are editing the section name
       result = await updateSection({
        sectionName: data.sectionName,
        sectionId : editSectionName,
        courseId: course._id
      },token)
      console.log("I am here to edit section",result);

    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId : course._id
      },token)

      console.log("Result in onSubmit in Course builder form  while creating section:",result );
    }

    //update value
    if(result){
      // console.log("Result in onSubmit in Course builder form  while creating section:    ",result );
      dispatch(setCourse(result))
      // console.log("After course :    ",course )
      setEditSectionName(null);
      setValue("sectionName","");
    }

    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId,sectionName)=>{
     console.log("course ",course._id);
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (

    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Section Name */}
        <div className='flex flex-col space-y-2'>

          <label
            className='text-sm text-richblack-5'
            htmlFor='sectionName'
          >
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add section name"
            {
            ...register("sectionName", { required: true })
            }
            disabled={loading}
            className='form-style w-full'
          />
          {
            errors.sectionName && (
              <span className='ml-2 text-xs tracking-wide text-pink-200'>Section Name is required</span>
            )
          }

        </div>

        <div className='items-end gap-x-4 flex '>

          <IconBtn 
          type="submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          >

           <GrAddCircle className='text-yellow-50 ' size={20}/>

          </IconBtn>

        {
          editSectionName && (
            <button type="button" onClick={cancelEdit} className='text-sm underline text-richblack-300'> Cancel Edit</button>
          )

        }

        </div>                                          

      </form>
      
      {
        course.courseContent.length > 0 && (
         <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className="flex justify-end gap-x-3">

        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center gap-x-2 bg-richblack-300 text-richblack-900 p-2'>Back</button>
        
        <IconBtn disabled={loading} text="Next" 
        onclick={goToNext}>
          <BiRightArrow/>
        </IconBtn>

      </div>


    </div>
  )
}

export default CourseBuilderForm