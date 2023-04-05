import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {type: mongoose.Schema.Types.ObjectId}, 
        name: {type: String},
        email: {type: String, unique:true},
        password: {type: String},
        isAdmin: {typr:Boolean}  
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User