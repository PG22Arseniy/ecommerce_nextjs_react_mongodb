import type { AppProps } from 'next/app'
import "../styles/Header.scss"  
import "../styles/Layout.scss"  
import "../styles/Footer.scss"  
import "../styles/Product.scss"  
import "../styles/customButton.scss"  
import { StoreProvider } from '@/utils/Store'


export default function App({ Component, pageProps }: AppProps) {
  return  (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider> 
  )
}
