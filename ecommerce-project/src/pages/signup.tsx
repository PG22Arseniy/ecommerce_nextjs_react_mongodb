import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Signup = () => {

    const nameRef = useRef<HTMLInputElement>(null) 
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const {redirect} = router.query

    const {data:session} = useSession()

    useEffect(()=>{
        if (session?.user){
            if (document.location.search.includes("checkout"))
                router.push('/ShippingAddress')
            else    
                router.push('/')  
        }
    },[router, session, redirect])


    const HandleSubmit = async (e:FormEvent) => {
        e.preventDefault()

        const name = nameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        try {

            // signup
            await axios.post ('/api/auth/signup', {
                name, email, password
            })

            // automatic login
            const result = await signIn ('credentials', {
                redirect: false,
                email,
                password
            })
            if (result?.error){
                toast.error (result.error)
            }

        } catch (error) {
            console.log ("cannot authenticate") 
        }
        
    }

    return (
        <Layout>
        <form className="authForm" onSubmit={HandleSubmit}> 
            <h1> Create Account </h1>
            <div className="inputRow">
                <label htmlFor="name"> Name </label>
                <input id="name" title="input" type="text"required  ref={nameRef}/>  
            </div>
            <div className="inputRow">
                <label htmlFor="email"> Email </label>
                <input id="email" title="input" type="email"required  ref={emailRef}/>  
            </div>
            <div className="inputRow">
                <label htmlFor="password"> Password </label>
                <input id="password" title="input" type="text" required pattern="\S*" minLength={7} ref={passwordRef}/> 
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