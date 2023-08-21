import React, { useEffect, useState } from 'react'
import AdminDashboardSidebar from '../components/AdminDashboardSidebar'
import AdminDashboardNav from '../components/AdminDashboardNav'
import LoadingButton from '../components/ButtonLoader'
import client from '../utilities/client'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'

const AdminProducts = () => {
    const [newProductDetails, setNewProductDetails] = useState({
        name: "",
        thumb: null,
        price: 0,
        description: "",
        category: 0,
        thumb: null,
        images: [],
    })

    const [msg, setMessage] = useState(null);
    const [categories, setCategories] = useState([])
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const submitNewProduct = () => {
        console.log(categories)
        if (categories.length === 0 || newProductDetails.category === null) {
            console.log(newProductDetails)
            setMessage({
                type: "error",
                msg: "Category is empty!",
            })
            return;
        }
        const formdata = new FormData();
        formdata.append("name", newProductDetails.name);
        formdata.append("price", newProductDetails.price);
        formdata.append("description", newProductDetails.description);
        formdata.append("categoryId", categories[newProductDetails.category]._id);
        formdata.append("images", newProductDetails.thumb);
        for (let i = 0; i < newProductDetails.images.length; i++) {
            formdata.append("images", newProductDetails.images[i]);
        }
        client.post("/product", formdata,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                setMessage({
                    msg: res.data.message,
                    type: res.data.status ? "success" : "error",
                });
                if (res.data.status) {
                    setProducts([...products, { ...res.data }]);
                    // setNewProductDetails({
                    //     name: "",
                    //     thumb: null,
                    //     price: 0,
                    //     description: "",
                    //     category: null,
                    //     thumb: null,
                    //     images: [],
                    // })
                }
            })
    }
    console.log("categories",categories)
    useEffect(() => {
        client.get("/category").then(res => {
            if (res.data.status) {
                setCategories([...res.data.categories])
            }
        })

        client.get("/product").then(res => {
            if (res.data.status) {
                setProducts([...res.data.products]);
            }
        })


    }, [])

    const deleteProduct = (id) => {
        client.delete("/product/" + products[id].product._id).then(res => {
            setMessage({
                type: res.data.status ? "success" : "error",
                msg: res.data.message,
            })
            if (res.data.status) {
                let n = products;
                n.splice(id, 1);
                setProducts([...n])
            }
        })
    }
    const showImagesPrevierw = () => {
        const list = [];
        for (let i = 0; i < newProductDetails.images.length; i++) {
            list.push(<img className='border border-black max-h-[100px] mb-[10px]' src={URL.createObjectURL(newProductDetails.images[i])} alt="" />)
        }
        return list;
    }
    console.log(newProductDetails)
    return (
        <>
            <AdminDashboardSidebar />
            <AdminDashboardNav />
            <Snackbar
                open={msg ? true : false}
                onClose={() => setMessage(null)}
                autoHideDuration={6000}

            >
                <Alert severity={msg?.type}>{msg?.msg}</Alert>
            </Snackbar>
            <div className='ml-[190px] h-[100vh] pr-[40px]'>
                <h1 className="mt-[80px] text-black text-[30px] font-bold">Category</h1>
                <div className='w-[400px] mt-[40px]'>
                    <div className="mb-[40px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Product Name
                        </label>
                        <input value={newProductDetails.name} onChange={e => setNewProductDetails({ ...newProductDetails, name: e.target.value })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Product Name..." />
                    </div>
                    <div className="mb-[40px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input value={newProductDetails.price} onChange={e => setNewProductDetails({ ...newProductDetails, price: e.target.value })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Price.." />
                    </div>
                    <div className="mb-[40px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select onChange={e => setNewProductDetails({ ...newProductDetails, category: Number(e.target.value) })} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            {
                                categories.map((item, key) => (
                                    <option key={key} value={key}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea value={newProductDetails.description} onChange={e => setNewProductDetails({ ...newProductDetails, description: e.target.value })} className="shadow h-[100px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Description Name..." ></textarea>
                    </div>

                    {
                        newProductDetails.thumb !== null && <div className="mb-[20px]">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Thumb Preview
                            </label>
                            <img className='border border-black' src={URL.createObjectURL(newProductDetails.thumb)} alt="" />

                        </div>
                    }


                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Thumb Logo
                        </label>
                        <input onChange={e => setNewProductDetails({ ...newProductDetails, thumb: e.target.files[0] })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" />
                    </div>

                    {
                        newProductDetails.images.length !== 0 && <div className="mb-[20px]">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Images Preview
                            </label>

                            {
                                showImagesPrevierw()
                            }

                        </div>
                    }




                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Product Images (*max 5)
                        </label>
                        <input multiple onChange={e => setNewProductDetails({ ...newProductDetails, images: e.target.files })} className="shadow h-[50px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" />
                    </div>


                    <LoadingButton open={submitButtonLoading} onClick={submitNewProduct} className={"w-full h-[40px] bg-orange-500 rounded shadow shadow-outline leading-tight appearance-none text-white"}>
                        Save
                    </LoadingButton>
                </div>

                <div className="relative overflow-x-auto mt-[60px] pb-[100px]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thumbnail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, key) => (
                                    <tr className="bg-white border-b " key={key}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.product.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.product.price}
                                        </th>
                                        <td className="px-6 py-4">
                                            {
                                                item?.images?.length ?
                                                    <a target='_blank' href={process.env.REACT_APP_BACKEND_URL + "/" + item.images[0].image}>
                                                        <img src={process.env.REACT_APP_BACKEND_URL + "/" + item.images[0].image} alt="" className="h-[40px]" />
                                                    </a>
                                                    : null
                                            }
                                        </td>

                                        <td className="px-6 py-4">
                                            <button onClick={() => deleteProduct(key)} className='shadow h-[40px] appearance-none border rounded w-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                <i className="fa-solid fa-trash text-red-400"></i>
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default AdminProducts