const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter product Name"],
        trim:true

    },
    description:{
        type:String,
        require: [true, "Please Enter product Description"]
    },
    price: {
        type:String,
        require: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 charecters"]
    },
    ratings: {
        type: Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                require:true
            },
            url:{
                type:String,
                require:true
            }
            }
    ],
        category: {
            type:String,
            require:[true, "Please Enter Product Category"],
             
        },
        Stock: {
            type:Number,
            require:[true, "Please Enter product Stock"],
            maxLenth:[4, "Stock cannot exceed 4 characters"],
            default:1

        },
        numOfReviews: {
          type:Number,
          default:0   
        },
        reviews: [
            {
              user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              rating: {
                type: Number,
                required: true,
              },
              comment: {
                type: String,
                required: true,
              },
            },
          ],
		user: {
			type:mongoose.Schema.ObjectId,
			ref:"user",
			require:true,
		},
        createAdt:{
            type:Date,
            default:Date.now
        }

})

module.exports = mongoose.model("Product", productSchema) 