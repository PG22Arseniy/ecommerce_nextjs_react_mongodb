import db from "@/utils/db"
import User from "../../../models/User"
import { data } from "@/utils/data";
import Product from "../../../models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async(req: NextApiRequest, res: NextApiResponse) => { 
    await db.connect()
    await User.deleteMany();
    await User.insertMany(data.users)    
    await Product.deleteMany();
    await Product.insertMany(data.products) 
    await db.disconnect()  
}

export default handler 