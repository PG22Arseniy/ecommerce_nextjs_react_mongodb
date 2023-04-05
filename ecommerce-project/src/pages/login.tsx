import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import Link from "next/link";
import React, { FormEvent, useEffect, useRef } from "react";
import {signIn, useSession} from 'next-auth/react'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type LoginProps = {
    checkout: Boolean
}


const Login = (props: LoginProps) => {


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


    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const HandleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        try {
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
                <h1> Login </h1>
                <div className="inputRow">
                    <label htmlFor="email"> Email </label>
                    <input id="email" title="input" type="email" required ref={emailRef}/>
                </div>
                <div className="inputRow">
                    <label htmlFor="password"> Password </label>
                    <input id="password" title="input" type="text" required pattern="\S*" minLength={7} ref = {passwordRef} />
                </div>
                <CustomButton type="submit"> Login </CustomButton>
                <Link href="/signup" className="authLink"> Create Account </Link>
            </form>



        </Layout>
    )
}

export default Login 