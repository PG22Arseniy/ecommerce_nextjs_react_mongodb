import { Layout } from '@/components/Layout'
import { ProductItem } from '@/components/ProductItem'
import db from '@/utils/db' 
import Product from '../../models/Product'
import { Query } from 'mongoose';
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { data } from '@/utils/data';
import { ProductProps } from '@/types';



export default function Home ({data}:InferGetStaticPropsType<typeof getStaticProps>) {

  const products:ProductProps[] = data

  return ( 
    <Layout title='Home Page'> 
       <div className='productList'>
          {
              products 
              ?
              products.map((product)=>( 
              <ProductItem product={product} key={product.slug}/> 
            ))        
              : <> GETTING DATA FROM DATABASE </>               
          }
       </div> s
    </Layout> 
  )
} 


export const getStaticProps:GetStaticProps =async (context) => {
   
    await db.connect()

    const data = await Product.find().lean() 
    const objData = JSON.parse(JSON.stringify (data))   

    return {
      props: { 
        data:  objData 
      }
    }
}
