import { CartItemProps, ProductProps } from '@/types';
import {Dispatch, ReactNode, createContext, useContext, useReducer} from 'react'


export const enum STORE_ACTION_TYPE {
    ADD_TO_CART,
    REMOVE_FROM_CART,
}

type StoreAction = { 
    type: STORE_ACTION_TYPE
    payload: {
        item: CartItemProps, 
    }
}

type CartStateProps = {
    cart: {
        cartItems: (CartItemProps | undefined)[] 
        date?: Date,
        Price?: number,
        GetCartNumber ():number
    } 

}
const initialState:CartStateProps = {
    cart: {
        cartItems: [],
        GetCartNumber: function (): number {

            let sum:number = 0
            this.cartItems.forEach(item => {
                sum = sum + item?.quantity! 
            })

            return sum;  
        }
    }
}

const reducer = (state: typeof initialState,  action: StoreAction):  typeof initialState => {

    switch (action.type){

        case STORE_ACTION_TYPE.ADD_TO_CART: {

            const newItem = action.payload.item 

            let ItemIsNew = true
            state.cart.cartItems.map(item=>{
                if (item?.product.slug === newItem.product.slug) 
                {
                    ItemIsNew = false
                    item.quantity = newItem.quantity
                }

            })
            
            const cartItems: (CartItemProps | undefined) [] = 
                ItemIsNew ? [...state.cart.cartItems, newItem]  
                          : [...state.cart.cartItems] 

            return {...state, cart: {...state.cart, cartItems }} 
        }  

        case STORE_ACTION_TYPE.REMOVE_FROM_CART:{ 
            return state
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


