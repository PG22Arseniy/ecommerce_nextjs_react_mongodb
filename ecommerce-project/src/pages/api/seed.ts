import db from "@/utils/db"
import User from "../../../models/User"
import { data } from "@/utils/data";

const handler = async(req: Request, res: Response) => {
    await db.connect()
    await User.deleteMany();
    await User.insertMany(data.users)
    await db.disconnect()  
}

export default handler 