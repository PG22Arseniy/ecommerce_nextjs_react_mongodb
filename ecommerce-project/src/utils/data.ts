import { ProductProps } from "@/types"


type DataProps = {
    products: ProductProps[]
}
export const data:DataProps = { 
    products: [
        {
            id: 1,
            name: "Red Shirt",
            slug: "red-shirt",
            price: 50,
            category: "Shirts",
            imageDir: "/images/shirt1.jpg",
            numReviews: 0,
            countInStock: 10,
            description: "A red Shirt"
        },
        {
            id: 2,
            name: "White Shirt",
            slug: "white-shirt",
            price: 50,
            category: "Shirts",
            imageDir: "/images/shirt2.jpg",
            numReviews: 0,
            countInStock: 5,
            description: "A white Shirt"
        },
        {
            id: 3,
            name: "Black Shirt",
            slug: "black-shirt",
            price: 50,
            category: "Shirts",
            imageDir: "/images/shirt3.jpg",
            numReviews: 0,
            countInStock: 12,
            description: "A black Shirt"
        },
        {
            id: 4,
            name: "Yellow Shirt",
            slug: "yellow-shirt",
            price: 50,
            category: "Shirts",
            imageDir: "/images/shirt4.jpg",
            numReviews: 0,
            countInStock: 7,
            description: "A yellow Shirt" 
        }
        ,
        {
            id: 5,
            name: "Black Jeans",
            slug: "black-jeans",
            price: 50,
            category: "Shirts",
            imageDir: "/images/jeans1.jpg",
            numReviews: 0,
            countInStock: 12,
            description: "Black jeans",
            brand: "ZARA" 
        },
        {
            id: 6,
            name: "Yellow Jeans",
            slug: "yellow-jeans",
            price: 50,
            category: "Jeans",
            imageDir: "/images/jeans2.jpg",
            numReviews: 0,
            countInStock: 7,
            description: "Yellow jeans" 
        }
    ]
}