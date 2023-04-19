import type { AppProps } from 'next/app'
import "../styles/Header.scss"  
import "../styles/Layout.scss"  
import "../styles/Footer.scss"  
import "../styles/Product.scss"  
import "../styles/customButton.scss"  
import "../styles/ShoppingCart.scss"  
import "../styles/Auth.scss"   
import "../styles/Global.scss" 
import "../styles/Collection.scss"  
import "../styles/Checkout.scss" 
import "../styles/Order.scss" 
import 'react-toastify/dist/ReactToastify.css'  
import { StoreProvider } from '@/utils/Store'
import {SessionProvider} from 'next-auth/react' 
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { env } from 'process'


export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return  (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true} options={{ "client-id": process.env.PAYPAL_CLIENT_ID!}}> 
          <Component {...pageProps} /> 
        </PayPalScriptProvider>
      </StoreProvider> 
    </SessionProvider>
  )
}

