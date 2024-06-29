const mongoose =  require('mongoose');
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODBURL)
    .then(()=>{
        console.log("Connection in database is successfully done.");
    })
    .catch((error)=>{
        console.log("Issue in database connection");
        console.log(error);
        process.exit(1);
    })
}