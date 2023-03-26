import { CheckoutComp } from "@/components/CheckoutComp";
import { Layout } from "@/components/Layout";
import React from "react";

const Payment = () => {

    return (
        <Layout>
            <div className="paymentScreen">
                <CheckoutComp activeStep = {1}/>
                <h1> Payment </h1>

                <h2> Choose your payment method </h2>

                
            </div>
        </Layout>
    )
}

export default Payment 