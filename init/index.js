const mongoose=require("mongoose");
const initData=require("./data.js");
// const Listing=require("./models/listing.js");
const Listing=require("../models/listing.js");


//mongodb connect krregge
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
//main function ko call krege
main()
.then(()=>{
    console.log("connnected to db");
    // initDB();
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}

const initDB=async()=>{
    //phle se data hai to clean krege 
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
};

initDB();

///////////////////////////////////deepseek///////////////////////
// const mongoose = require("mongoose");
// const initData = require("./data.js"); // Path to your data file
// const Listing = require("../models/listing.js"); // Path to your Listing model

// // MongoDB connection URL
// const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// // Connect to MongoDB
// main()
//     .then(() => {
//         console.log("Connected to DB");
//         initDB(); // Initialize the database
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(mongo_url);
// }

// // Initialize the database with seed data
// const initDB = async () => {
//     // Delete all existing data
//     await Listing.deleteMany({});

//     // Insert new data
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// };
// initDB();