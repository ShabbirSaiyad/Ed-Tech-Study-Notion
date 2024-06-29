import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/Operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import {setCourse, setStep} from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { toast } from "react-hot-toast";
import {COURSE_STATUS} from '../../../../../utils/constants';
import { MdNavigateNext } from 'react-icons/md';

const CourseInformationForm = () => {

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);

  const {token} = useSelector((state) => state.auth);   

  const [loading, setLoading] = useState(false);

  const [courseCategories, setcourseCategories] = useState([]);

  useEffect(() => {

    const getCategories = async () => {
      setLoading(true);

      const categories = await fetchCourseCategories()
      // console.log("Categories: " ,categories)

      if (categories.length > 0) {

        setcourseCategories(categories);
      }
      setLoading(false);
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnails);
    }

    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isFormUpdated = ()=>{
    const currentValues = getValues();

    if(currentValues.courseTitle !== course.courseName || currentValues.courseShortDesc !== course.courseDescription || 
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn || 
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() 
      || currentValues.courseImage !== course.thumbnails
    ){
      return true;
    }
    else{
      return false;
    }

  }

  //Handlessss next button
  const onSubmit = async (data) => {

     if(editCourse){

      if(isFormUpdated()){
        const currentValues = getValues();
        const formData =  new FormData();
  
        console.log("Data in course info form",data);
        formData.append("courseId",course._id);
  
        if(currentValues.courseTitle !== course.courseName ){
          formData.append("courseName",data.courseTitle);
        }
        if(currentValues.courseShortDesc !== course.courseDescription ){
          formData.append("courseDescription",data.courseShortDesc);
        }
        if(currentValues.coursePrice !== course.price ){
          formData.append("price",data.coursePrice);
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn ){
          formData.append("whatYouWillLearn",data.courseBenefits);
        }
        if(currentValues.courseTags.toString() !== course.tag.toString() ){
          formData.append("tag",JSON.stringify(data.courseTags));
        }
        if(currentValues.courseCategory._id !== course.category._id ){
          formData.append("category",data.courseCategory);
        }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString() ){
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }
        if(currentValues.courseImage !== course.thumbnails){
          formData.append("thumbnails",data.courseImage);
        }
  
        setLoading(true);
  
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if(result){

          dispatch(setStep(2));
          dispatch(setCourse(result));
          // console.log(result);
        }
  
       }
       else{
        toast.error("No changes made in course")
       }
       
       return
      }

      //create a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage);

      setLoading(true);

      const result = await addCourseDetails(formData, token);

      if (result) {
        console.log("Result of formdata: ",result);
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }

      setLoading(false);
      console.log("PRINTING FORM DATA : ",formData);
      console.log("PRINTING result : ", result);

}

  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md bg-richblack-800 border-[1px] border-richblack-700 p-6 space-y-8'>


      {/* CourseTitle */}
      <div className='flex flex-col space-y-2'>

        <label
          className='text-sm text-richblack-5'
          htmlFor='courseTitle'
        >
          Course Title <sup className='text-pink-200'>*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter course title"
          {
          ...register("courseTitle", { required: true })
          }
          className='form-style w-full'
        />
        {
          errors.courseTitle && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Course title is required</span>
          )
        }

      </div>

      {/* CourseDescription */}
      <div className='flex flex-col space-y-2'>
        <label
          className='text-sm text-richblack-5'
          htmlFor="courseShortDesc"
        >
          Course Short Description<sup className='text-pink-200'>*</sup>
        </label>

        <textarea
          type="text"
          id="courseShortDesc"
          placeholder='Enter short description'
          {
          ...register("courseShortDesc", { required: true })
          }
          className='form-style resize-x-none min-h-[130px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Course short description is required</span>
          )
        }
      </div>

      {/* coursePrice */}
      <div className='flex flex-col space-y-2'>

        <label
          className='text-sm text-richblack-5'
          htmlFor='coursePrice'>
          Course Price<sup className='text-pink-200'>*</sup>
        </label>

        <div className='relative'>
          <input
            id="coursePrice"
            placeholder="Enter course price"
            {
            ...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)$/
              },
            })
            }
            className='form-style w-full !pl-12'
          />

          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />

          {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}

        </div>
        
      </div>

      {/* Course Categories */}
      <div className="flex flex-col space-y-2">
          <label htmlFor='courseCategory' className="text-sm text-richblack-5">Course Category<sup className="text-pink-200">*</sup></label>

          <select 
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory",{required:true})}
          className="form-style w-full"
          >

            <option value="" disabled>Choose a Category</option>

            {
              !loading && courseCategories.map((category, index)=>(
                <option key={index} value={category._id}>
                  {category?.name}
                </option>
              ))
            }
          </select>
          {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
      label="Tags"
      name="courseTags"
      placeholder="Enter tags and press enter"
      register={register}
      errors={errors}
      setValue={setValue}
      
      />

      {/* course Thumbnails */}
      <Upload 
      name="courseImage"
      label="Course Thumbnail"
      register={register}
      setValue={setValue}
      errors={errors}
      editData={editCourse ? course?.thumbnails : null}/>


      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          type="text"
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* courseRequirements */}
      <RequirementField
      name="courseRequirements"
      label="Requirements/Instructions"
      register={register}
      setValue={setValue}
      errors={errors}/>

      <div>
        {
          editCourse && (
            <button
            onClick={()=> dispatch(setStep(2))}
            className='flex items-center gap-x-2 bg-richblack-300'  
            >
              Continue without Saving
            </button>
          )
        }

        <IconBtn 
        disabled={loading}
        text={!editCourse ? "Next" : 
        "Save Changes"}
        /> 
        <MdNavigateNext/>

      </div>

     

    </form>
  )
}

export default CourseInformationForm