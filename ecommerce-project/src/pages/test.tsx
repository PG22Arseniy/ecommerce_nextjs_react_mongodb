import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React, { FormEvent } from "react";
import { getStaticProps } from ".";

const Test: NextPage = ({
    products
}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const HandleSubmit = (e:FormEvent) => {
        e.preventDefault()

        console.log (products) 
    }

    return (
        <Layout>
        <form className="authForm" onSubmit={HandleSubmit}>  
            <h1> Create Account </h1>
            <CustomButton type="submit"> Signup  </CustomButton>
            <Link href="/login" className="authLink"> Login </Link>  
        </form>
        
        

        </Layout>   
    )
}

export default Test