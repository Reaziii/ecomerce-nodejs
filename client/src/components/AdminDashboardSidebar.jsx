import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboardSidebar = () => {
    const menus = [
        {
            path: "/admin-dashboard/category",
            text: "Category",
            icon: <i className="fa-regular fa-folder-open"></i>

        },
        {
            path: "/admin-dashboard/products",
            text: "Products",
            icon: <i className="fa-solid fa-gift"></i>

        },
        {
            path: "/admin-dashboard/banners",
            text: "Banners",
            icon: <i className="fa-solid fa-scroll"></i>
        },
        {
            path: "/admin-dashboard/orders",
            text: "Orders",
            icon: <i className="fa-solid fa-scroll"></i>
        }
    ]

    return (
        <div style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        }} className='w-[150px] h-[100vh] flex flex-col items-center pt-[100px] fixed top-0 left-0 bg-white z-10'>

            {
                menus.map((item, key) => (
                    <Link to={item.path} key={key}>
                        <button className='w-[120px] h-[120px] bg-white mt-[20px]'>
                            {item.icon}
                            <p>{item.text}</p>
                        </button>
                    </Link>
                ))
            }

        </div>
    )
}

export default AdminDashboardSidebar