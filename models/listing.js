// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;

// const listingSchema=new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//      description:String,
//     image:{
//     type:String,
//     //?true:false


//     // image toh aarhi but empty hai isliye default kiya 
//     default:
//         "https://images.unsplash.com/photo-1583452924150-c86772c4fab6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsaW5nfGVufDB8fDB8fHww",
//     set: (v)=>
//         v===""
//     ?"https://images.unsplash.com/photo-1583452924150-c86772c4fab6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsaW5nfGVufDB8fDB8fHww"
//     :v,
//     },
//     price:Number,
//     location:String,
//     country:String,

// });
// const Listing= mongoose.model("Listing",listingSchema);
// module.exports=Listing;



////////////////
// const mongoose = require("mongoose");
// const Schema=mongoose.Schema;
// const listingSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   location: String,
//   image: { 
//     filename: String, 
//     url: String 
//   }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;


//////////////////////deepseek/////////////////////
const mongoose=require("mongoose");
const review = require("./review");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
  title: {
      type: String,
      required: true,
  },
  description: String,
  image: {
      filename: String,
      url: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
});
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;
