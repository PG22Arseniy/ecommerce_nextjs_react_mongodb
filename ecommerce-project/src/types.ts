
import { PAYMENT_METHOD } from "./utils/Store"

export type ProductProps = {
    name: string,
    slug: string,
    price:number,
    category: string,
    imageDir?: string
    brand?: string,
    rating?: number,
    numReviews: number,
    countInStock:number,
    description: string
}

export type CartItemProps = {

    product: ProductProps,
    quantity: number,  
}

export type UsersProps = {
    _id: Number
    name: string,
    email: string,
    password: string,
    isAdmin: Boolean
}


export type ShippingAddressProps = {
    fullName: string, 
    address: string, 
    city: string, 
    postalCode: string, 
    country: string, 
}

export type OrderType = {
    orderItems: CartItemProps[],
    shippingAddress: ShippingAddressProps,
    paymentMethod: PAYMENT_METHOD,
    orderPrice: Number
}