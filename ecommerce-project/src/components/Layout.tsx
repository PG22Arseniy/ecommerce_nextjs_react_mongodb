import { STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react"; 
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import { DropDownLink } from "./DropDownLink";
import Cookies from "js-cookie";

type LayoutProps = {
    title?:string,
    children: ReactNode; 
}

export const Layout = ({title, children}:LayoutProps) =>{ 


    const {status, data:session} = useSession()

    const {state, dispatch } = useStoreContext();
    const {cart} = state
    
    const [cartItemsCount, setItemsCount]  = useState(0)

    useEffect (()=>{
        setItemsCount(cart.GetCartItemCount())

    },[cart.cartItems])   

    const Logout = () => {
        Cookies.remove('cart')
        if (state.cart.cartItems.length > 0)
            dispatch({type:STORE_ACTION_TYPE.CART_RESET, payload : {} }); 
        signOut({callbackUrl:'/login'})
    } 

return (
    <div>

        <Head> 
            <title>[{title? title:"Ecommerce" }]</title>
            <meta name="description" content="Ecommerce Wesite" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <ToastContainer position="bottom-center" limit={1}/> 

        <div className="layoutContainer"> 

            <header>
                <nav className="headerNavigation">
                    <Link href="/" className="headerLink">
                        Store 
                    </Link>
                    <Link href="/collection" className="headerLink">
                        Best Off
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


                        {
                            status === "loading" 
                                ? "Loading"
                                : session?.user 
                                    ? ( 
                                        <Menu as="div" className="userMenu">
                                            <Menu.Button className="userButton">
                                                {session.user.name}
                                            </Menu.Button>
                                            <Menu.Items className="contextMenu">
                                                <Menu.Item>
                                                    <DropDownLink className = "dropdownLink" href="/profile">
                                                        Profile
                                                    </DropDownLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <DropDownLink className = "dropdownLink" href="/orders">
                                                        Order History
                                                    </DropDownLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link className = "dropdownLink" href="#" onClick={Logout}>
                                                        Logout 
                                                    </Link>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Menu>
                                    ) 
                                    : <Link href="/login" className="headerLink"> 
                                        Login 
                                      </Link>                                 
                        }
                      
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