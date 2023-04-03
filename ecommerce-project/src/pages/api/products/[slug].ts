
import { NextApiRequest, NextApiResponse } from "next"
import Product from "../../../../models/Product"
import db from "../../../utils/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const { query } = req
    const { slug } = query

    const product = await Product.findOne({ slug })

    console.log ("checking product") 

    await db.disconnect();
     
    res.send(product) 
}

export default handler 