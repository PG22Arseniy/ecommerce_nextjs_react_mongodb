import { useStoreContext } from "@/utils/Store";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react"; 


type LayoutProps = {
    title?:string,
    children: ReactNode; 
}

export const Layout = ({title, children}:LayoutProps) =>{ 


    const {state, dispatch } = useStoreContext();
    const {cart} = state

    const [cartItemsCount, setItemsCount]  = useState(0)

    useEffect (()=>{
        setItemsCount(cart.GetCartItemCount())
    },[cart.cartItems]) 

return (
    <div>

        <Head> 
            <title>[{title? title:"Ecommerce" }]</title>
            <meta name="description" content="Ecommerce Wesite" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="layoutContainer"> 

            <header>
                <nav className="headerNavigation">
                    <Link href="/" className="headerLink">
                        Store 
                    </Link>
                    <div className="CartLogin"> 
                        <Link href="/cart" className="headerLink">   
                            <p>Cart</p>   
                            {
                                cart.cartItems != null && cartItemsCount > 0 
                                ? <span className="cartNum">{cartItemsCount} </span>
                                : ''
                            }  
                        </Link>
                        <Link href="/login" className="headerLink"> Login </Link>
                    </div>
                </nav>
            </header>
            <main className="mainBody">
                {children}
            </main>
            <footer className="footer">  
                <p className="copyrightText"> Copyright 2023 Arseniy Skudaev </p> 
            </footer> 

        </div>
    </div>
)
}