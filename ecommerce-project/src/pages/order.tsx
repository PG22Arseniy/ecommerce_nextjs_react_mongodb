import { CheckoutComp } from "@/components/CheckoutComp";
import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import React from "react";

const Order = () => {

    const PlaceOrder = () => {
        console.log ("Order placed")
    }

    return (
        <Layout>
            <CheckoutComp activeStep={3}/>
            <div className="OrderScreen">
                <h1> Place Order </h1>
                <CustomButton onClick={PlaceOrder}> Place Order </CustomButton>
            </div>
        </Layout>
    )
}

export default Order