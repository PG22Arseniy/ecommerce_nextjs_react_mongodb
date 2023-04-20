import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { OrderType } from "@/types";
import { PAYMENT_METHOD } from "@/utils/Store";
import { PayPalButtons,  SCRIPT_LOADING_STATE,  usePayPalScriptReducer} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {OnApproveData, OnApproveActions, CreateOrderData, CreateOrderActions} from "@paypal/paypal-js/types/components/buttons";
import { toast } from "react-toastify";

const Order = () => {

    const router = useRouter()

    const {query} = router

    const {id} = query

    const [order, setOrder] = useState<OrderType|null>(null)

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()


    useEffect(()=>{

        const fetchOrder = async()=> {
            if (!id) return 
            const {data} = await axios.get(`/api/orders/${id}`) 

            setOrder(data)   
        }

        fetchOrder()

        if (!order) return 
        
        const loadPaypalScript = async() => {
            const {data: clientId} = await axios.get('/api/keys/paypal')
            paypalDispatch({
                type:"resetOptions",
                value: {
                    'client-id': clientId,
                    currency: 'CAD'
                }
            })

            paypalDispatch({type: 'setLoadingStatus', value: SCRIPT_LOADING_STATE.PENDING})
        }

        loadPaypalScript();




    },[id, paypalDispatch, order?.paid])    


    const PayOrder = ()=> {
        console.log ("payment")
    }

    function createOrder(data: CreateOrderData, actions: CreateOrderActions): Promise<string> {
        return actions.order.create({
            purchase_units:[
                {
                   // amount: {value: order?.orderPrice.toString()!} 
                    amount: {value: "1"}  
                }
            ]
        }). then ((orderID)=>{
            return orderID
        })
    }

    function onApprove(data: OnApproveData, actions: OnApproveActions): Promise<void> {
        return actions.order?.capture().then (async function (details) {
            try { 
                const {data} = await axios.put(`/api/orders/${order?._id}/pay`, details)
                window.location.reload(); 

                
            }
            catch {

            }
        })!
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

                                {
                                    order.paymentMethod === PAYMENT_METHOD.PAYPAL.toUpperCase()
                                    ?  
                                    <PayPalButtons createOrder={createOrder} onApprove={onApprove}>
                                        Pay With Paypal
                                    </PayPalButtons>
                                    :
                                    <CustomButton onClick={PayOrder}> Pay with {order.paymentMethod} </CustomButton> 
                                }    
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