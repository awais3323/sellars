const { kMaxLength } = require("buffer")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please write description of product"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter the Price"],
        maxLength: [15, "Price cannot exceed 8 figure amount"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true]
            },
            url: {
                type: String,
                required: [true]
            }
        }
    ],
    colors:{
        type: String,
        required: [true, "Please enter available colors"],
    },
    sizes:{
        type: String,
        // required: [true, "Please enter available sizes for product"],
    },
    weight:{
        type:Number,
    },
    category: {
        type: String,
        required: [true, "Category is must"]
    },
    Stock: {
        type: String,
        required: [true, "Please Enter Product Stock"],
        // maxlength: [4, "Stock cannot exceed 4 figures"],
        default: 1
    },
    sales:{
        type:Number,
        default:0,
        maxLength: [2, "Price cannot exceed 8 figure amount"]

    },
    limited:{
        type:String,
        default:"none"
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            url: {
                    type: String,
                    required: [true],
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    Tags: [
        {
            tag1:{
                type: String,
                required:true
            },
            tag2: {
                type: String,
                required: true,
            },
            tag3: {
                type: String,
                required: true
            },
            tag4: {
                type: String,
                required: true
            },
            tag5: {
                type: String,
                required: true
            }
        }
    ],
    tags :{
        type:String,
        default:"yes"
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Product", productSchema)

