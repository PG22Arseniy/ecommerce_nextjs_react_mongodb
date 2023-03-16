import React from 'react'
import { useRouter } from 'next/router'
import { ProductProps } from '@/types'
import { data } from '@/utils/data'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '@/components/CustomButton'


const ProductScreen = () => {

    const { query } = useRouter()
    const { slug } = query
    const product:ProductProps|undefined  = data.products.find(item => item.slug === slug)

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
                        <div>
                            {
                                product.countInStock > 0 
                                ? `In Stock (${product.countInStock} remaining)` 
                                : "Unavailable"
                            }
                        </div>
                    </div>
                    <CustomButton className='addToCartBtn'> Add to Cart </CustomButton>
                </div>
            </div>
        </Layout>
    ) 

}

export default ProductScreen; 