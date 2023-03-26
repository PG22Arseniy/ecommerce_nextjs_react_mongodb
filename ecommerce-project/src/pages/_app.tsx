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
import 'react-toastify/dist/ReactToastify.css'  
import { StoreProvider } from '@/utils/Store'
import {SessionProvider} from 'next-auth/react' 


export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return  (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} /> 
      </StoreProvider> 
    </SessionProvider>
  )
}

