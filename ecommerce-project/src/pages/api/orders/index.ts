import db from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";

const handler =async (req: NextApiRequest, res: NextApiResponse) => {


    console.log("order created")  
    const session = await getSession({req})

    if (!session)
      return res.status(401).send("not authenticated") 

     const {user} = session

     await db.connect()  

    const newOrder = new Order({
        ...req.body,
        user: user
    }) 
 
    
    // const order = await newOrder.save(); 
     res.status(201).send(newOrder)  
    
}

export default handler 