
const express= require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path = require("path");

const methodOverride = require("method-override");

const ejsMate=require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")
// const {listingSchema}=require("./schema.js");
const { listingSchema, reviewSchema, bookingSchema } = require("./schema.js");
const Review=require("./models/review.js");

const Booking = require("./models/booking.js");
//mongodb connect krregge
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
//main function ko call krege
main()
.then(()=>{
    console.log("connnected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"public")));
//basic api create kr rhe
app.get("/", (req,res)=>{
    res.send ("hi i am root");
});



//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });
  // isko new route ko show rout ke upr rkh rhe kiy mil ske
  //New Route
  app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  app.get("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  }));
  
  //Create Route
  app.post("/listings", wrapAsync(async (req, res,next) => {
    let result=listingSchema.validate(req.body);
    console.log(result);
    if (result.error){
      throw new ExpressError(400,result.error);
    }
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing");
    // }
    // if(!newListing.title){
    //   throw new ExpressError(400,"title is missing");
    // }
    // if(!req.body.description){
    //   throw new ExpressError(400,"description is missing");
    // }
    // if(!req.body.location){
    //   throw new ExpressError(400,"location is missing");
    // }
    // let {title,description,image,price,country,location}=req.body
    // let listing = req.body.listing;
    // console.log=(listing);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

 
}));
  //Edit Route
  app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
   
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  app.put("/listings/:id", wrapAsync(async (req, res) => {
    if(!req.body.listing){
      throw new ExpressError(400,"send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }));

  // reviews
  // post route

  // app.post("/listings/:id/reviews",async(req,res)=>{
  //   let listing=await Listing.findById(req.params.id);
  //   let newReview=new Review(req.body.review);
  //   listing.reviews.push(newReview);
  //   await newReview.save();
  //   await listing.save();
  //   console.log("new review saved");
  //   res.send("new review saved");
    
  // });

// reviews post route - UPDATE THIS
app.post("/listings/:id/reviews", wrapAsync(async (req, res) => {
    // 🆕 ADD VALIDATION
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    
    console.log("new review saved");
    res.redirect(`/listings/${req.params.id}`); // 🆕 Redirect back to listing
}));

  // Booking Route - Add this with your other routes
app.post("/listings/:id/book", wrapAsync(async (req, res) => {
// 🆕 ADD VALIDATION HERE - Yeh 4 lines add karo
const { error } = bookingSchema.validate(req.body);
if (error) {
    throw new ExpressError(400, error.details[0].message);
}

    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;
    
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = (listing.price * nights) + 500 + 300; // base + cleaning + service

    const booking = new Booking({
        listing: id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalPrice: totalPrice
    });

    await booking.save();
    
    // Success response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmed - Wanderlust</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body class="bg-light">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card shadow-lg text-center">
                            <div class="card-body p-5">
                                <div class="text-success mb-4">
                                    <i class="fas fa-check-circle fa-5x"></i>
                                </div>
                                <h1 class="card-title h2 text-success mb-3">Booking Confirmed!</h1>
                                <p class="card-text lead mb-4">
                                    Your booking for <strong>${listing.title}</strong> has been successfully confirmed.
                                </p>
                                
                                <div class="booking-details bg-light p-4 rounded mb-4 text-start">
                                    <h5 class="mb-3">Booking Details:</h5>
                                    <p><strong>Check-in:</strong> ${checkInDate.toDateString()}</p>
                                    <p><strong>Check-out:</strong> ${checkOutDate.toDateString()}</p>
                                    <p><strong>Guests:</strong> ${guests}</p>
                                    <p><strong>Total Nights:</strong> ${nights}</p>
                                    <hr>
                                    <p class="h5 text-success"><strong>Total Amount:</strong> ₹${totalPrice.toLocaleString('en-IN')}</p>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <a href="/listings/${id}" class="btn btn-primary">
                                        <i class="fas fa-arrow-left me-2"></i>Back to Listing
                                    </a>
                                    <a href="/listings" class="btn btn-outline-secondary">
                                        <i class="fas fa-home me-2"></i>Browse More Listings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
}));

// First, make sure you have a reviewSchema validation similar to listingSchema
// const {reviewSchema} = require("./schema.js"); // Add this with your other requires

// // POST Review Route (Improved)
// app.post(
//   "/listings/:id/reviews",
//   wrapAsync(async (req, res, next) => {
//     // Validate review data
//     const {error} = reviewSchema.validate(req.body);
//     if (error) {
//       throw new ExpressError(400, error.details[0].message);
//     }

//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       throw new ExpressError(404, "Listing not found");
//     }

//     const newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);

//     // Use transaction for atomic operations
//     await newReview.save();
//     await listing.save();

//     req.flash("success", "Successfully added review!"); // If using flash messages
//     res.redirect(`/listings/${listing._id}`);
//   })
// );
  



// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title: "Cozy Mountain Cabin",
//         description: "A beautiful cabin in the mountains with a scenic view.",
//         price: 100,
//         location: "Himalayas",
//     });
//     await sampleListing.save();
//     res.send("Sample listing added successfully!");
//    });

///error handling//////////
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});
app.use ((err,req,res,next) => {
  // res.send("something went wrong");
  let{statusCode=500, message="something went wrong"}=err;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
});

const server = app.listen(8080, () => {
    console.log("server is listening to port 8080");
});

// Handle EADDRINUSE error gracefully
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Port 8080 is busy. Trying port 3000...');
        app.listen(3000, () => {
            console.log("server is listening to port 3000");
        });
    }
});








