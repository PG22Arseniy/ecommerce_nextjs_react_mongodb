import { CartItemProps, ProductProps } from "@/types";
import Link from "next/link";
import React, { ReactNode } from "react";
import { CustomButton } from "./CustomButton";
import { Highlight } from "@/global";
import { STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store";
import db from "@/utils/db";
import Product from "../../models/Product";
import { MongoClient } from "mongodb";
import axios from "axios";

type ItemProps = {
    product: ProductProps,
}

export const ProductItem = ({product}:ItemProps) => {

    const {state, dispatch} = useStoreContext()

    const AddToCart = async () => { 


        const existItem: CartItemProps | undefined = state.cart.cartItems.find(item=>item?.product.slug === product.slug)

        const quantity:number = existItem ? existItem.quantity + 1 : 1

        const {data} = await axios.get (`/api/products/${product.slug}`)     

        if (!data) {

            console.log ('item found in stock')  
            return
        } 
        else console.log ('item found in stock') 


        if (quantity > product.countInStock) {
            Highlight(document.getElementById(`inStock-${product.slug}`)!, "yellow", 3, "aqua")     
            return
        } 

        dispatch({type: STORE_ACTION_TYPE.ADD_TO_CART, payload:{item:{product:{...product}, quantity: quantity}}})  
 
         
    }

    return (
        <div className="itemCard card">  
            <Link href={`/product/${product.slug}`}> 
                <img 
                    src = {product.imageDir}
                    alt = {product.name}  
                    className="itemImage"   
                />
            </Link>

            <div className="itemContent">
                <Link href={`/product/${product.slug}`}> 
                    <h2 className="productName"> {product.name} </h2>
                </Link>
                <p className="productBrand">
                    { 
                        product.brand!=null 
                        ?  `${product.brand}`
                        : "" 
                    }
                </p>
                <p className="inStock" id = {`inStock-${product.slug}`}>
                    { product.countInStock + " left in stock" }  
                </p>
                <p className="productPrice">${product.price}</p>
                <CustomButton className='addToCartBtn' onClick={AddToCart}> 
                    Add To Cart
                </CustomButton>  
            </div>
        </div>
    )
}