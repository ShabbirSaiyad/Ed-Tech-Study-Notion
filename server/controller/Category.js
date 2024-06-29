const Category = require('../model/Category');

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

exports.createCategory =  async(req,res)=>{
    try{

        //fetch data
        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required.",
            });
        }
        
        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log("category details : ",categoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"category created successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//getallCategory handlers
exports.showAllCategories = async(req,res)=>{
    try{
        const allCategory = await Category.find({},{name:true, description:true});

        res.status(200).json({
            success:true,
            message:"All category returned successfully",
            allCategory,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.categoryPageDetails = async(req,res)=>{
    try{
        //get catagory id
        const {categoryId} =  req.body;

        //get courses for specified categoryId
        const selectedCategory =  await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews",
          })
        .exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }

        //get courses for different catagories
        const categoriesExceptSelected = await Category.find({
            _id : {$ne : categoryId},
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[ getRandomInt(  categoriesExceptSelected.length ) ]._id
           )
        .populate({ 
            path : "courses",
            match : {status : "Published"},   
        })
        .exec();

        console.log("Different category : ", differentCategory );
        

        //get top 10 selling courses
        const allCategories = await Category.find()
        .populate({
            path : "courses",
            match : {status : "Published"},
            populate:{
                path: "instructor",
            },
        })
        .exec();

        const allCourses = allCategories.flatMap((category)=> category.courses);

        const mostSellingCourses = allCourses.sort((a,b) => {
            b.sold - a.sold
        }).slice(0,10);
        console.log("Most selling courses : ",mostSellingCourses);

        //return response
        return res.status(200).json({
            success:true,
            message:"All  the category data is fetched successfully",
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}