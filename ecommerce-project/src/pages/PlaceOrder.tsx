import { CheckoutComp } from "@/components/CheckoutComp";
import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { OrderType } from "@/types";
import { STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store";
import axios from "axios";
import { randomInt } from "crypto";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";


const Order = () => {

    const { state, dispatch } = useStoreContext()

    const { cart } = state

    const { cartItems, shippingAddress, PaymentMethod } = cart

    const router = useRouter()

    const {status, data:session} = useSession()


    const PlaceOrder = async () => {

        const order: OrderType = {
            orderItems: [],
            shippingAddress: shippingAddress,
            paymentMethod: PaymentMethod,
            orderPrice: cart.GetCartPrice(),
            userEmail: session?.user?.email!,
            paid: false,
            delivered: false
        }
        cartItems.map(item => {
            order.orderItems.push({ price: item.product.price, slug: item.product.slug, quantity: item.quantity, name: item.product.name })
        })
        


        try {
            const {data} = await axios.post('/api/orders', order)

            await router.push(`/order/${data._id}`)  
            
            dispatch({type: STORE_ACTION_TYPE.CART_RESET, payload: {}}) 
 
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <Layout>
            <CheckoutComp activeStep={3} />
            <div>
                {
                    cartItems.length === 0
                        ? (
                            <div> <h1> No Items in Store </h1>  <a href="/"> Go Shopping </a> </div>
                        )
                        : (
                            <div className="placeOrderScreen">
                                <h1> Place Order </h1>

                                <div className="card">
                                    <h2> Shipping Address </h2>
                                    <div className="address"> {Object.values(shippingAddress).map((value) => <p key={value}> {value}; </p>)} </div>
                                    <a href="/shipping"> Edit </a>
                                </div>

                                <div className="card">
                                    <h2> Payment Method </h2>
                                    <p>{PaymentMethod}</p>
                                    <a href="/payment"> Edit </a>
                                </div>

                                <div className="card">
                                    <h2> Order Summary </h2>
                                    {cartItems.map(item => (
                                        <div key={item.product.slug}>
                                            <p>{item.product.name}: <span>{item.quantity} </span> </p>
                                        </div>
                                    ))}
                                    <p> Total: ${cart.GetCartPrice()} </p>
                                    <p> you still can <a href="/cart"> go back to cart </a> </p>
                                </div>

                                <CustomButton onClick={PlaceOrder}> Place Order </CustomButton>
                            </div>
                        )
                }


            </div>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(Order), { ssr: false }); 