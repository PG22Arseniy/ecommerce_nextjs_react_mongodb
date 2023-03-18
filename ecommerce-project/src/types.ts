export type ProductProps = {
    id: number,
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