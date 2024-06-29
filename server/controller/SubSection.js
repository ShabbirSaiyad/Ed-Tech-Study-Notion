const SubSection = require('../model/SubSection');
const Section = require('../model/Section');
const { uploadImageToCloudinary } =  require('../utils/imageUploader');
require('dotenv').config();

//create subection
exports.createSubSection = async(req,res)=>{
    try{ 
        //fetch data from req.body
        const {sectionId,title, description} = req.body;

        //extract video
        const video = req.files.videoFile;
        // validation
        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success:false,
                message:"All field are required",
            });
        }

        // upload in cloudinary
        const uploadDetails =  await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        console.log("video", uploadDetails)
        // create subsection
        const subsectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        // update section with subsection objectid
        const updatedSection = await Section.findByIdAndUpdate(   
            {_id:sectionId},
            {
            $push:{
                subSection:subsectionDetails._id,
            },
            },
            {new:true},
        ).populate("subSection")

        //hw log updated section with this subsection objectid
        //return response
        return res.status(200).json({
            success:true,
            message:'Subsection created successfully',
            updatedSection,
        })

    }catch(error){
        console.error("Error creating while new subsection");
        return res.status(500).json({
            success:false,
            message:"Unable to create subSection,Please try again",
            error:error.message,
        });
    }
}

//hw: update subsection
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Sub Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the sub section",
      })
    }
  }

//hw:delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      });
    }
  }