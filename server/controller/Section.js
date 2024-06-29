const Section =  require('../model/Section');
const SubSection =  require('../model/SubSection');
const Course =  require('../model/Course');

exports.createSection = async(req,res)=>{
     try{ 
        //data fetch
        const {sectionName, courseId} = req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",

            });
        }
        //create section
        const newSection = await Section.create({sectionName});

        //update course with section ObjectId
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
            )
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();
      
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updateCourseDetails,
        });

     }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section,Please try again",
            error:error.message,
        });

     }
}

exports.updateSection = async(req,res)=>{
    try{
        //data fetch
        const {sectionName,sectionId,courseId} = req.body;

        //validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",

            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        console.log("Updated Section : ",section);

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            data : course,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section,Please try again",
            error:error.message,
        });
    }
}

exports.deleteSection = async(req,res)=>{
    try{
           //fetch data
           const {sectionId, courseId} = req.body;
           
           await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent : sectionId,
            }
           });

           //use findByIdAndDelete
           const section = await Section.findById(sectionId);

           if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found",
                data:section
            });
           }

           // delete subsection
           await SubSection.deleteMany({_id : {$in : section.subSection}});

           await Section.findByIdAndDelete(sectionId);

           //find the updated course and return
           const course = await Course.findById(courseId)
           .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
           })
           .exec();

           //return response
           return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            data  : course,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section,Please try again",
            error:error.message,
        });
    }
}