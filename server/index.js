const express = require('express');
const app =  express();

const db = require('./config/database');

const userRoutes = require("./routes/User");
// const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload =  require('express-fileupload');

require('dotenv').config();

const PORT = process.env.PORT || 5000


//database connection
db.connect(); 

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));

app.use(
    fileUpload({
      useTempFiles:true,
      tempFileDir:"/temp",
    })
)

//cloudinary Connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
// app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//def route
app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running",
    });
});

//listening of App
app.listen(PORT,()=>{
    console.log(`App listening an Port ${PORT}`);
});

