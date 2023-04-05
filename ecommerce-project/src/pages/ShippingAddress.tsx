import { CheckoutComp } from "@/components/CheckoutComp";
import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef } from "react";

const Shipping = () => {

    const router = useRouter()

    const {state, dispatch} = useStoreContext();
    const {cart} = state
    
    const fullNameRef = useRef<HTMLInputElement>(null) ;
    const addressRef = useRef<HTMLInputElement>(null) ;
    const cityRef = useRef<HTMLInputElement>(null) ;
    const postalCodeRef = useRef<HTMLInputElement>(null) ;
    const countryRef = useRef<HTMLInputElement>(null) ;

    
    const SubmitHandler = (e: FormEvent) => {

        e.preventDefault()

        const fullName = fullNameRef.current?.value
        const address = addressRef.current?.value
        const city = cityRef.current?.value
        const postalCode = postalCodeRef.current?.value
        const country = countryRef.current?.value 

        if (!fullName || !address || !city || !postalCode || !country) return

        dispatch ({
            type: STORE_ACTION_TYPE.SAVE_SHIPPING_ADDRESS,
            payload: {shippingAddress: {fullName, address, city, postalCode, country}}
        })


        Cookies.set('shippingAddress', JSON.stringify({
            fullName, address, city, postalCode, country 
        }))


        router.push ("/PaymentMethod")  
     }

    return (
        <Layout title="Checkout" >
            <CheckoutComp activeStep = {1}/>

            <form
                className="shippingForm"
                onSubmit={SubmitHandler}
            >
                <h1> Shipping Address </h1>

                <div className="inputRow"> 
                    <label htmlFor="fullName"> Full Name </label>
                    <input type="text" id="fullName" autoFocus required ref = {fullNameRef} />
                </div>

                <div className="inputRow"> 
                    <label htmlFor="address"> Street Address </label>
                    <input type="text" id="address" autoFocus required ref={addressRef} />
                </div>

                <div className="inputRow"> 
                    <label htmlFor="city"> City </label>
                    <input type="text" id="city" autoFocus required  ref={cityRef}/>
                </div>

                <div className="inputRow"> 
                    <label htmlFor="postalCode"> Postal Code </label>
                    <input type="text" id="postalCode" autoFocus ref={postalCodeRef}/>
                </div>

                <div className="inputRow"> 
                    <label htmlFor="country"> Country </label>
                    <input type="text" id="country" autoFocus ref={countryRef}/>
                </div>

                <CustomButton type="submit"> Next Step </CustomButton> 


            </form> 
        </Layout>
    )
}

export default Shipping; 