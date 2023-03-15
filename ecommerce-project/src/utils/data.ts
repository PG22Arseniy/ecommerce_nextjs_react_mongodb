
type ProductProps = {
    name: string,
    slug: string,
    category: string,
    imageDir?: string
    brand?: string,
    rating?: number,
    numReviews: number,
    countInStock:number,
    description: string
}
type DataProps = {
    products: ProductProps[]
}
const data:DataProps = {
    products: [
        {
            name: "Red Shirt",
            slug: "red-shirt",
            category: "Shirts",
            imageDir: "/images/shirt1.jpg",
            numReviews: 0,
            countInStock: 10,
            description: "A red Shirt"
        }
    ]
}