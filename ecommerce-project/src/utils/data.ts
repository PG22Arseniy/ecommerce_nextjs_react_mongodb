import { ProductProps, UsersProps } from "@/types"
import bcrypt from 'bcryptjs'


type DataProps = {
    users: UsersProps[],
    products: ProductProps[]
}
export const data:DataProps = { 
    users:[ 
        {
            name: "Senya",
            email: "arseniyskudaev@gmail.com",
            password: bcrypt.hashSync("Zagusi99"),
            isAdmin: true
        },
        {
            name: "Leva",
            email: "levka.skudaev@mail.ru",
            password: bcrypt.hashSync("Uposuv58"),
            isAdmin: false
        }
    ],
    products: [
        {
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