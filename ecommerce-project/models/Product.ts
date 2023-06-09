import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String},
        slug: {type: String, unique:true},
        category: {type: String},
        imageDir: {type:String}, 
        price: {type: String},
        brand: {type:String}, 
        rating: {type: Number}, 
        NumberOfReviews: {type:Number},
        countInStock:{type:Number} ,
        description: {type:String},     
    },
    {
        timestamps: true
    }
)

console.log (mongoose.models) 
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)


export default Product