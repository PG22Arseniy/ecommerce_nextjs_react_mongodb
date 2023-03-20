import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import Link from "next/link";
import React, { FormEvent } from "react";

const Signup = () => {

    const HandleSubmit = (e:FormEvent) => {
        e.preventDefault()
    }

    return (
        <Layout>
        <form className="authForm" onSubmit={HandleSubmit}> 
            <h1> Create Account </h1>
            <div className="inputRow">
                <label htmlFor="email"> Email </label>
                <input id="email" title="input" type="email"required />  
            </div>
            <div className="inputRow">
                <label htmlFor="password"> Password </label>
                <input id="password" title="input" type="text" required pattern="\S*" minLength={7}/> 
            </div>
            <div className="inputRow">
                <label htmlFor="password2"> Confirm Password </label>
                <input id="password2" title="input" type="text" required pattern="\S*" minLength={7}/> 
            </div>
            <CustomButton type="submit"> Signup  </CustomButton>
            <Link href="/login" className="authLink"> Login </Link>  
        </form>
        
        

        </Layout>   
    )
}

export default Signup