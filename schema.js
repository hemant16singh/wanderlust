// const Joi =require('joi');
// module.exports.listingSchema=Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         country:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         image:Joi.string().allow("",null),
//     }).required(),
// });

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        // 🆕 UPDATE THIS - Change from string to object
        image: Joi.object({
            url: Joi.string().uri().required(),
            filename: Joi.string().required()
        }).required()
    }).required(),
});

// 🆕 ADD THIS - Review Schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});

// 🆕 ADD THIS - Booking Schema (Optional but recommended)
module.exports.bookingSchema = Joi.object({
    checkIn: Joi.date().greater('now').required(),
    checkOut: Joi.date().greater(Joi.ref('checkIn')).required(),
    guests: Joi.number().required().min(1).max(10)
});