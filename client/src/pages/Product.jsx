import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../utilities/client';
import Header from '../components/Header';
import OrderModal from '../components/OrderModal';

const Product = () => {
  const id = useParams().id;
  const [product, setProduct] = useState({});
  const [active, setActive] = useState({});
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState({});
  const [openPayModal, setOpenPayModal] = useState(false);
  useEffect(() => {
    client.get("/product/" + id).then(res => {
      if (res.data.status) {
        console.log(res.data)
        setProduct({ ...res.data.product });
        setCategory({ ...res.data.category })
        setImages([...res.data.images])

      }
    })
  }, []);
  useEffect(() => {
    if (images.length > 0) setActive(images[0]);
  }, [images])
  return (
    <div>
      <Header />
      {openPayModal && <OrderModal onClose={() => setOpenPayModal(false)} product={product} />}
      <div className="pt-[100px] pl-[40px] pr-[40px]">
        <div className="text-gray-500">Home / {category.name}</div>
        <div className="flex flex-row mt-[40px]">
          <div className="">
            {images.map((item, key) => (
              <div onClick={() => {
                setActive({ ...item })
              }} key={key} className='w-[100px] border border-black mb-[10px] cursor-pointer'>
                <img src={process.env.REACT_APP_BACKEND_URL + "/" + item.image} alt="" />
              </div>
            ))}
          </div>

          <div className="min-w-[400px] ml-[20px]">
            <img className='border border-black' src={process.env.REACT_APP_BACKEND_URL + "/" + active.image} alt="" />
          </div>

          <div className="ml-[40px]">
            <p className="font-semibold text-[20px]">{product.name}</p>
            <p className='font-semibold text-[20px] text-gray-400'>PRODUCT CODE : {product._id}</p>
            <p className='font-semibold text-[30px]'>৳ {product.price} </p>
            <button onClick={() => setOpenPayModal(true)} className='font-semibold text-[20px] bg-orange-500 text-white px-[50px] py-[10px] mt-[40px] rounded-[4px]'>Buy Now</button>
            <p className='mt-[20px]'>{product.description}</p>
          </div>


        </div>

      </div>


    </div>
  )
}

export default Product