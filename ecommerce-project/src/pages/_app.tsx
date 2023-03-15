import type { AppProps } from 'next/app'
import "../styles/Header.scss"  
import "../styles/Layout.scss"  
import "../styles/Footer.scss"  
import "../styles/Product.scss"  


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
