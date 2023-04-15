import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        orderItems: [
            {
                name: {type: String},
                price: {type: Number},
                quantity: {type: Number},
                imageDir: {type:String}, 
            }
        ],
        shippingAddress: {

            fullName: {type: String},
            address: {type: String},
            city: {type: String},
            postalCode: {type:String}, 
            country: {type:String},
        }, 
        paymentMethod: {type: String},
        orderPrice: {type: Number},
        userEmail: {type: String},
        paid: {type: Boolean},
        delivered: {type: Boolean}, 
        orderDate: {type: Date}
    },
    {
        timestamps: true
    }
)

console.log (mongoose.models) 
const Order = mongoose.models.order || mongoose.model("order", OrderSchema)


export default Order