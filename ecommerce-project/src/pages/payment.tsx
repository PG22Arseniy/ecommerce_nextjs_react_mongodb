import { CheckoutComp } from "@/components/CheckoutComp";
import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { Highlight } from "@/global";
import { PAYMENT_METHOD, STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const Payment = () => {

    const router = useRouter()
    const {state, dispatch} = useStoreContext();
    //type PM = keyof typeof PAYMENT_METHOD 
    const [selectedPM, setSelectedPM] = useState<string>(state.cart.PaymentMethod)

    const submitHandler = (e:FormEvent) => { 
        e.preventDefault()
        if (!selectedPM || selectedPM === "")  {
            Highlight(document.getElementById("choosePM")!, "red", 3, "white") 
            return
        }  

        dispatch ({
            type: STORE_ACTION_TYPE.SET_PAYMENT_METHOD,
            payload: {PaymentMethod: selectedPM as PAYMENT_METHOD}
        })

        Cookies.set('PaymentMethod', selectedPM) 

        router.push("/order") 
    }

    return (
        <Layout>
            <div className="paymentScreen">
                <CheckoutComp activeStep = {2}/> 
                <h1> Payment </h1>

                <h2 id = "choosePM"> Choose your payment method </h2>
                <form onSubmit={submitHandler}>
                {
                    (Object.keys(PAYMENT_METHOD) as Array<string>).map((method) =>(
                        <div key={method} className="paymentOption">  
                            <input
                                type="radio"
                                id={method}
                                name="paymentMethod"
                                checked = {selectedPM === method}
                                onChange={()=>setSelectedPM(method)}
                            />
                            <label htmlFor={method}> {method} </label>
                        </div>
                        
                    ))
                }

                <CustomButton type="submit"> Next </CustomButton>
                </form>
            </div>
        </Layout>
    )
}

export default Payment 