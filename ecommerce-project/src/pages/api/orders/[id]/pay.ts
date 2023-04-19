
import Order from "../../../../../models/Order"
import db from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
          
    const session = getSession({req})

    if (!session) {
        return res.status(401).send('Error: unauthenticated')
    }

    await db.connect()

    const order = await Order.findById(req.query.id)

    if (!order) return res.status(402).send('Cannnot find order')
    if (order.paid) return res.status(400).send('Order has already been paid') 

    order.paid = true;
    
    const paidOrder = await order.save()

    await db.disconnect()

    res.send({message: 'order paid successfully', order: paidOrder}) 




}

export default handler