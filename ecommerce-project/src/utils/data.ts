
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
export const data:DataProps = { 
    products: [
        {
            name: "Red Shirt",
            slug: "red-shirt",
            category: "Shirts",
            imageDir: "/images/shirt1.jpg",
            numReviews: 0,
            countInStock: 10,
            description: "A red Shirt"
        },
        {
            name: "White Shirt",
            slug: "white-shirt",
            category: "Shirts",
            imageDir: "/images/shirt2.jpg",
            numReviews: 0,
            countInStock: 5,
            description: "A white Shirt"
        },
        {
            name: "Black Shirt",
            slug: "vlack-shirt",
            category: "Shirts",
            imageDir: "/images/shirt3.jpg",
            numReviews: 0,
            countInStock: 12,
            description: "A black Shirt"
        },
        {
            name: "Yellow Shirt",
            slug: "yellow-shirt",
            category: "Shirts",
            imageDir: "/images/shirt4.jpg",
            numReviews: 0,
            countInStock: 7,
            description: "A yellow Shirt" 
        }
    ]
}