import { Layout } from "@/components/Layout"
import { OrderType } from "@/types"
import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

const Orders = () => {

    const [orders, setOrders] = useState<OrderType[] | null>(null)

    const { data: session } = useSession()
    const email = session?.user?.email

    useEffect(() => {
        const fetchOrders = async () => {

            if (!email) return

            const { data } = await axios.get('/api/orders/getAll', {
                params:
                {
                    email: email 
                }
            }
 
            )
            if (!data) return
            setOrders(data)
        }

        fetchOrders()
    }, [email])

    return (
        <Layout> 
            <div className="order-history">
                <h1> Order History </h1>
                {
                    !orders
                        ? "Fetching Orders"
                        : <div>

                            <ul>
                                {orders.map(order => (
                                    <li key={order._id?.toString()}>
                                        <a href={`order/${order._id?.toString()}`}>
                                            {order._id?.toString()!}
                                        </a>
                                    </li>
                                )
                                )}
                            </ul>
                        </div>


                }
            </div>
        </Layout>
    )
}

export default Orders