import { CustomButton } from "@/components/CustomButton";
import { Layout } from "@/components/Layout";
import { CartItemProps } from "@/types";
import { STORE_ACTION_TYPE, useStoreContext } from "@/utils/Store"
import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
 
const Cart = () => {
    
    const {state, dispatch} = useStoreContext();

    const {cart} = state

    const router = useRouter() 

    const {status, data:session} = useSession()

    const removeItemFromCart = (item:CartItemProps) => {
        dispatch({type: STORE_ACTION_TYPE.REMOVE_FROM_CART, payload:{item}}) 
    }

    const QuantityChange = (quantity:number, item: CartItemProps) =>{  
       
        dispatch({type: STORE_ACTION_TYPE.ADD_TO_CART, payload:{item:{product:{...item.product}, quantity: quantity}}})
    }

    const checkoutHandler = () => {

        if (session?.user)
            router.push ("/ShippingAddress")  
        else
            router.push("/Login?checkout")   

    }

    return (
       <Layout title="Cart">
            <h1 className="cartTitle"> Shopping Cart </h1>

            {
                cart.cartItems.length === 0                
                ?            
                <div className="emptyCart">
                    <p> Cart is empty </p>
                    <Link href="/"> Go Shopping </Link>
                </div>
                : 
                <div className="cartGrid">
                    <div className="cartProducts">
                        <table>
                            <thead> 
                                <tr>
                                    <th> Item </th>
                                    <th> Quantity </th>
                                    <th> Price </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartItems.map((item)=>(
                                    <tr key={item?.product.slug}>
                                        <td>
                                            <Link href = {`/product/${item?.product.slug}`}> 
                                                <div className="ImageName">
                                                    <img
                                                        src={item?.product.imageDir}
                                                        alt={item?.product.name}
                                                        width={50}
                                                        height={50}       
                                                    />
                                                    <p> {item?.product.name} </p> 
                                                </div>
                                            </Link>
                                        </td>
                                        <td>  
                                            <input type="number" 
                                            placeholder={String(item?.quantity!)}  
                                            max={item?.product.countInStock} 
                                            min={1} 
                                            title="input"
                                            onChange={(e)=> {
                                                if (e.target.value == "") return  

                                                let quantity:number = Number(e.target.value)

                                                if (quantity > item?.product.countInStock! ){
                                                    e.target.value = `${item?.product.countInStock!}`
                                                    quantity = item?.product.countInStock! 
                                                }
                                                if (quantity < 1 ){
                                                    e.target.value = `1`
                                                    quantity = 1  
                                                } 
                                                QuantityChange(quantity, item!)
                                            }}
                                            /> 
                                        </td>
                                        <td>
                                            {item?.quantity! * item?.product.price!} 
                                        </td>
                                        <td>
                                            <CustomButton onClick={()=>{removeItemFromCart(item!)}} value={item?.product.slug}> Delete </CustomButton>
                                        </td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="checkout card"> 
                        <div className="total"> 
                            <p>Items: {cart.GetCartItemCount()}, Price: {cart.GetCartPrice()}</p>
                        </div>
                        <CustomButton onClick={checkoutHandler}>CheckOut</CustomButton>
                    </div> 
                </div> 

            } 

       </Layout>
    )
}

export default dynamic(()=>Promise.resolve(Cart), {ssr:false}); 