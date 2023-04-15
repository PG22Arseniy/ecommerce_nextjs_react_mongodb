import { Layout } from "@/components/Layout";
import { OrderType } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = () => {

    const router = useRouter()

    const {query} = router

    const {id} = query

    const [order, setOrder] = useState<OrderType|null>(null)

    useEffect(()=>{

        const fetchOrder = async()=> {
            if (!id) return 
            const {data} = await axios.get(`/api/orders/${id}`) 
            setOrder(data)  
        }

        fetchOrder()


    },[id]) 


    return(
        <Layout>
            <div >
                <h1> Order: {id} </h1>

            {
                !order
                ? <div> Fetching Order... </div>
                
                : <div>
                    <p> Payment Method: {order.paymentMethod}</p>
                    <p> Shipping Address: {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p> Email: {order.userEmail}</p>
                    <p> Ordered Items: </p> 
                        <ul>
                        {
                            order.orderItems.map(item=>( 
                                <li key={item.name}> {item.name}, {item.quantity} </li>
                            ))
                        }
                        </ul> 
                    
                    <p> Total Price: {order.orderPrice.toString()}</p> 
                    
                </div>
            }
            </div>
        </Layout>
    )
}

export default Order