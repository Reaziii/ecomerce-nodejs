import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import client from '../utilities/client';
import { Link } from 'react-router-dom';

const TrackOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        client.get("/order/myorders").then(res => {
            if (res.data.status) {
                setOrders([...res.data.orders])
            }
        })
    }, [])
    return (
        <div>
            <Header />
            <div className='p-[40px] mt-[50px]'>
                <h1 className='font-bold text-[30px]'>My Orders</h1>


                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Order Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Delivery Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((item, key) => (
                                    <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.order._id}
                                        </th>
                                        <td class="px-6 py-4">
                                            <Link to={"/product/"+item.product._id}>
                                                {item.product.name}
                                            </Link>
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.product.price}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.order.address}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.order.deliveryStatus}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default TrackOrders