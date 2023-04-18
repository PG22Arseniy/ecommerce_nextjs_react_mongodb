import db from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import Order from "../../../../models/Order"
import { useSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await db.connect()              
 
    const orders = await Order.find({ userEmail: req.query.email }) 


    await db.disconnect()

    if (!orders) res.status(401).send("Orders Not Found")
    else res.status(201).send(orders)


}

export default handler