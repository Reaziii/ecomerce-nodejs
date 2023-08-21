import React, { useEffect, useState } from 'react'
import client from '../utilities/client';
import { Link } from 'react-router-dom';
import AdminDashboardSidebar from '../components/AdminDashboardSidebar';
import AdminDashboardNav from '../components/AdminDashboardNav';
import { useDispatch } from 'react-redux';
import { showSnakbar } from '../redux/snakbar/snakbarAction';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(-1);
    const dispatch = useDispatch();
    const loadOrders = () => {
        client.get("/order").then(res => {
            setOrders([...res.data.orders])
        })
    }
    useEffect(() => {
        loadOrders();
    }, []);
    const changeStatus = (key, status) => {
        client.put("/order/change-delivery-status/" + orders[key].order._id, {
            status
        }).then(res => {
            if (res.data.status) loadOrders();
            dispatch(showSnakbar(res.data.status ? "success" : "error", res.data.message))
        })
    }
    return (
        <div>
            <AdminDashboardSidebar />
            <AdminDashboardNav />
            <div class="ml-[160px] relative mb-'[200px]">
                <h1 className="mt-[80px] text-black text-[30px] font-bold">Orders</h1>
                <table class="mt-[40px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User name
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
                                <tr key={key} class="bg-white dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.order._id}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.user.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        <Link to={"/product/" + item.product._id}>
                                            {item.product.name}
                                        </Link>
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.product.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.order.address}
                                    </td>
                                    <td class="px-6 py-4 relative">
                                        <button
                                            onClick={() => {
                                                if (key === openDropdown) setOpenDropdown(-1);
                                                else setOpenDropdown(key);
                                            }}

                                            id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{item.order.deliveryStatus}</button>
                                        <div

                                            style={{
                                                display: openDropdown === key ? "unset" : "none"
                                            }}
                                            id="dropdownDivider" class="left-0 top-[60px] absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                                                <li onClick={() => changeStatus(key, "pending")}>
                                                    <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">pending</a>
                                                </li>
                                                <li onClick={() => changeStatus(key, "delivered")}>
                                                    <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">delivered</a>
                                                </li>
                                                <li onClick={() => changeStatus(key, "canceled")}>
                                                    <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">canceled</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminOrders