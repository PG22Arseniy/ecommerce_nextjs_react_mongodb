 
 import db from '../../../utils/db';
 import User from "../../../../models/User" 
 import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb';

 const handler = async(req, res) => {
    if (req.method !== 'POST') return

    const {name, email, password} = req.body

    await db.connect()

    const existingUser = await User.findOne({email: email})


    if (existingUser) {

        res.status(422).send("User Exists")
        await db.disconnect()
        return
    }

    const ObjectID = require('bson').ObjectId;
    const id  = new ObjectID();

    const user = new User({
        _id: id,         
        name,
        email,
        password: bcrypt.hashSync(password),
        isAdmin: false
    })



    const newUser = await user.save()

    res.status(201).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin 
    })

    
 }

 export default handler