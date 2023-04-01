import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { CartItemProps, ProductProps } from '@/types'
import { data } from '@/utils/data'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '@/components/CustomButton'
import { STORE_ACTION_TYPE, useStoreContext } from '@/utils/Store'
import { Highlight } from '@/global'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import db from '@/utils/db'
import Product from '../../../models/Product'



const ProductScreen = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const product:ProductProps|undefined  = data
    const {state, dispatch} = useStoreContext()

    if (product == null ) return; 

    const AddToCart = () => {

        const existItem: CartItemProps | undefined = state.cart.cartItems.find(item=>item?.product.slug === product.slug)

        const quantity:number = existItem ? existItem.quantity + 1 : 1

        if (quantity > product.countInStock) {
            Highlight(document.getElementById("inStock")!, "red", 3)   
            return
        } 

        dispatch({type: STORE_ACTION_TYPE.ADD_TO_CART, payload:{item:{product:{...product}, quantity: quantity}}})  
    }

    if (product == null) return <div> Not Found </div>

    return (
        <Layout title={product.name}>
            <div className="returnLink">
                <Link href = "/">Back</Link>
            </div> 

            <div className='productContent'>
                <div className='imageArea'>
                    {
                        product.imageDir != null
                        ? <Image
                            src = {product.imageDir}
                            alt={product.name} 
                            height={640}
                            width={480}  
                           />
                        : <div> {product.name} </div>
                    }
                </div>
                <div className='deatailArea'> 
                    <ul>
                        <li>
                            <h1 className="productName"> {product.name} </h1>
                        </li>
                        <li>
                            Category: {product.category}
                        </li> 
                        <li>
                            Brand: 
                            {
                                product.brand!=null 
                                ? product.brand
                                : " Unknown brand"  
                            }
                        </li> 

                        <li>
                            {
                                product.rating!=null && product.numReviews!=null 
                                ? product.rating + "of " + product.numReviews + " reviews"
                                : "Unknown rating" 
                            }
                        </li> 
                        <li>
                            Description: {product.description} 
                        </li> 
                    </ul>
                </div>
                <div className='card'>
                    <div className='cardDetails'>
                        <div>Price</div>
                        <div>${product.price}</div>
                    </div>
                    <div className='cardDetails'> 
                        <div id="inStock">
                            {
                                product.countInStock > 0 
                                ? `In Stock (${product.countInStock} remaining)` 
                                : "Unavailable"
                            }
                        </div>
                    </div>
                    <CustomButton className='addToCartBtn' onClick = {AddToCart}> Add to Cart </CustomButton> 
                </div>
            </div>
        </Layout>
    ) 

}

export default ProductScreen; 

export const getServerSideProps:GetServerSideProps =async (context) => {
   

    const { query } = context
    const { slug } = query 

    await db.connect()

    const product = await Product.findOne({slug}).lean()  
    const objProduct = JSON.parse(JSON.stringify (product))  

    await db.disconnect() 

    return {
      props: { 
        data: product? objProduct : null  
      }
    }
}