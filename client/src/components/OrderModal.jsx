import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ButtonLoader from './ButtonLoader'
import client from '../utilities/client'
const OrderModal = ({ product, onClose }) => {
    console.log(product)
    const user = useSelector(state => state.user);
    const ref = useRef();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        contact: user.phoneNumber,
        address: user.address,
        userId: user._id,
        name: user.name,

    });

    const handlePayment = () => {
        setLoading(true);
        client.post("/payment", { ...details, productId: product._id }).then(res => {
            if (res.data.status) {
                window.location = res.data.url;
            }
            setLoading(false);
        })
    }
    return (
        <div className='fixed w-full h-full bg-[#0000009e] z-30 top-0 left-0 flex justify-center items-center'>
            <div ref={ref} className="bg-white w-[50%] h-[90%] p-[40px]">
                <p className="font-semibold text-[20px]">{product.name}</p>
                <p className='font-semibold text-[20px] text-gray-400'>PRODUCT CODE : {product._id}</p>
                <p className='font-semibold text-[30px]'>৳ {product.price} </p>
                <p className='font-normal text-[16px] mt-[40px]'>Name:</p>
                <input className='border border-black h-[40px] w-full mt-[10px] pl-[10px]' value={details.name} readOnly />
                <p className='font-normal text-[16px] mt-[40px]'>Contact:</p>
                <input className='border border-black h-[40px] w-full mt-[10px] pl-[10px]' value={details.contact} onChange={e => setDetails({ ...details, contact: e.target.value })} />
                <p className='font-normal text-[16px] mt-[40px]'>Address:</p>
                <input className='border border-black h-[40px] w-full mt-[10px] pl-[10px]' value={details.address} onChange={e => setDetails({ ...details, address: e.target.value })} />
                <ButtonLoader open={loading} onClick={handlePayment} className={"mt-[40px] bg-orange-500 px-[30px] py-[15px] roudned-[10px] text-white font-bold text-[20px]"}>
                    Pay and Order
                </ButtonLoader>

                <ButtonLoader open={loading} onClick={onClose} className={"mt-[40px] bg-red-500 px-[30px] py-[15px] roudned-[10px] text-white font-bold text-[20px] ml-[20px]"}>
                    Cancel
                </ButtonLoader>
            </div>

        </div>
    )
}

export default OrderModal