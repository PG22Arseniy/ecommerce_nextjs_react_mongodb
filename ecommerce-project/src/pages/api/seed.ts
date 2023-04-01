import db from "@/utils/db"
import User from "../../../models/User"
import { data } from "@/utils/data";
import Product from "../../../models/Product";

const handler = async(req: Request, res: Response) => {
    await db.connect()
    await User.deleteMany();
    await User.insertMany(data.users)    
    await Product.deleteMany();
    await Product.insertMany(data.products) 
    await db.disconnect()  
}

export default handler 