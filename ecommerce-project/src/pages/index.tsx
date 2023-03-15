import { Layout } from '@/components/Layout'
import { ProductItem } from '@/components/ProductItem'
import { data } from '@/utils/data'

export default function Home() {
  return ( 
    <Layout title='Home Page'> 
       <div className='productList'>
          {
            data.products.map((product)=>(
              <ProductItem product={product}/>
            )) 
          }
       </div>
    </Layout> 
  )
} 
