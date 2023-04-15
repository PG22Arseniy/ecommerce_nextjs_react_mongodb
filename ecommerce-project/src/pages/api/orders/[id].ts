import db from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import Order from "../../../../models/Order"

 const handler = async (req: NextApiRequest, res:NextApiResponse) => {

    await db.connect()
    const { query } = req
    const { id } = query

    const order = await Order.findById(id)    

    
     await db.disconnect()

    if (!order) res.status(401).send("Order Not Found")
    else res.status(201).send(order)   

  
 }

 export default handler