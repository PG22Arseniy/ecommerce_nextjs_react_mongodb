import { ProductProps } from "@/types";
import Link from "next/link";
import React, { ReactNode } from "react";

type ItemProps = {
    product: ProductProps;
}

export const ProductItem = ({product}:ItemProps) => {

    return (
        <div className="itemCard">  
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
                <p className="productPrice">${product.price}</p>
                <button className="addToCartBtn" type="button"> 
                    Add To Cart
                </button>
            </div>
        </div>
    )
}