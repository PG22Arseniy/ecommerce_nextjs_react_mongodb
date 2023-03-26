import { CartItemProps, ProductProps, ShippingAddressProps } from '@/types';
import {Dispatch, ReactNode, createContext, useContext, useReducer} from 'react'
import Cookies from 'js-cookie'
import { stat } from 'fs';

export const enum STORE_ACTION_TYPE {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_RESET,
    SAVE_SHIPPING_ADDRESS
}
export enum PAYMENT_METHOD{
    PAYPAL = "Paypal",
    CREDIT_CARD = "Credit",
    DEBIT_CARD = "Debit",
    CASH = "Cash",
    ETRANSFER = "ETransfer",
    BONUSES = "Bonuses", 
}

type StoreAction = { 
    type: STORE_ACTION_TYPE
    payload: {
        item?: CartItemProps,  
        shippingAddress?: ShippingAddressProps
    }
}

type CartStateProps = {
    cart: {
        cartItems: CartItemProps[] 
        date?: Date,
        shippingAddress?: ShippingAddressProps
        PaymentMethod?: PAYMENT_METHOD.DEBIT_CARD,
        GetCartItemCount ():number,
        GetCartPrice ():number
    } 

}
const initialState:CartStateProps = {
    cart: {
        cartItems: Cookies.get('cartItems')
            ? JSON.parse(Cookies.get('cartItems')!)
            : [],
        shippingAddress: Cookies.get('shippingAddress')
            ? JSON.parse(Cookies.get('shippingAddress')!)
            : {},
        GetCartItemCount: function (): number {

            let sum:number = 0
            this.cartItems.forEach(item => {
                sum = sum + item?.quantity! 
            })

            return sum;  
        },

        GetCartPrice: function (): number { 

            let sum:number = 0

            this.cartItems.forEach(item => {
                sum = sum + item?.quantity! * item?.product.price! 
            })

            return sum;  
        }
    }
}

const reducer = (state: typeof initialState,  action: StoreAction):  typeof initialState => {

    switch (action.type){

        case STORE_ACTION_TYPE.ADD_TO_CART: {

            const newItem = action.payload.item 

            if (!newItem) return state

            let ItemIsNew = true
            state.cart.cartItems.map(item=>{
                if (item?.product.slug === newItem?.product.slug) 
                {
                    if (!item) return

                    ItemIsNew = false
                    item.quantity = newItem?.quantity!
                }

            })
            
            const cartItems: CartItemProps [] = 
                ItemIsNew ? [...state.cart.cartItems, newItem]  
                          : [...state.cart.cartItems] 

            Cookies.set('cartItems', JSON.stringify(cartItems))   
            
            

            return {...state, cart: {...state.cart, cartItems }} 
        }  

        case STORE_ACTION_TYPE.REMOVE_FROM_CART:{ 

            const itemToRemove = action.payload.item 

            if (!itemToRemove) return state

            const cartItems = state.cart.cartItems.filter(item=>
                item?.product.slug !== itemToRemove.product.slug
            ) 

            Cookies.set('cartItems', JSON.stringify(cartItems))   

            return {...state, cart: {...state.cart, cartItems }} 
        }

        case STORE_ACTION_TYPE.CART_RESET: {
            const cartItems: (CartItemProps)[] = [];
            return {...state, cart: {...state.cart, cartItems }} 
        }   

        case STORE_ACTION_TYPE.SAVE_SHIPPING_ADDRESS:{
            
            if (!action.payload.shippingAddress) return state

            return {
                ...state, 
                cart: {
                     ...state.cart,
                     shippingAddress: {
                        ...state.cart.shippingAddress,
                        ...action.payload.shippingAddress
                     }
                }
            }
        }
        
        default: return state
    } 


}


type StoreProviderProps = { 
    children: ReactNode
}

type StoreContext = {
    state: typeof initialState
    dispatch: Dispatch<StoreAction>
}

const Store = createContext<StoreContext | null>(null)

export function StoreProvider ({children}: StoreProviderProps) {

    const [state, dispatch] = useReducer(reducer, initialState);

    return <Store.Provider value = {{state, dispatch}}>{children}</Store.Provider>
}


export const useStoreContext = () => {
    return useContext(Store) as StoreContext 
}



