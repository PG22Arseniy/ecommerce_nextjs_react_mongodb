import { ProductProps } from "@/types";
import Link from "next/link";
import React, { ReactNode } from "react";
import { CustomButton } from "./CustomButton";

type ItemProps = {
    product: ProductProps;
}

export const ProductItem = ({product}:ItemProps) => {

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
                <p className="productPrice">${product.price}</p>
                <CustomButton className='addToCartBtn'> 
                    Add To Cart
                </CustomButton>  
            </div>
        </div>
    )
}