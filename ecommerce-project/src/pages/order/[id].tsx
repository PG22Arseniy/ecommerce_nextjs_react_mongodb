import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { OrderType } from "@/types";
import { PAYMENT_METHOD } from "@/utils/Store";
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
            console.log (data) 
            setOrder(data)   
        }

        fetchOrder()


    },[id]) 


    const PayOrder = ()=> {
        console.log ("payment")
    }

    return(
        <Layout>
            <div >
                <h1> Order: {id} </h1>

            {
                !order
                ? <div> Fetching Order... </div>
                
                : <div className="orderScreen"> 
                    <div className="card"> 
                        <h2> Order Details: </h2> 
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
                    <div className="card">
                        <h2> Payment </h2> 
                        <p>{order.paymentMethod}</p>
                         {
                            order.paid? 
                               <p className="stepDone"> paid </p> 
                            : 
                            order.paymentMethod === PAYMENT_METHOD.CASH.toUpperCase()?  
                               <div className="stepDone"> Payment on Delivery </div> 
                            :
                            <div className="payment">  
                                <p className="stepNotDone"> Unpaid </p> 
                                <CustomButton onClick={PayOrder}> Pay with {order.paymentMethod} </CustomButton> 
                            </div>
                        } 
                    </div>  

                    <div className="card">
                        <h2> Delivery </h2> 
                         {
                            order.delivered? 
                               <p className="stepDone"> Delivered </p> 
                            : 
                                <p className="stepNotDone"> Not Delivered </p>  
                        }  
                    </div>    
                </div>
            }
            </div>
        </Layout>
    )
}

export default Order