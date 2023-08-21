import React, { useEffect, useState } from 'react'
import client from '../utilities/client';
import { Link } from 'react-router-dom';

const ProductsByCategory = ({ categoryId, categoryName }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client.get("/product/" + categoryId + "/products-by-category").then(res => {
      setProducts([...res.data.products])
    })
  }, [])
  return (
    <div className='mt-[100px] flex flex-col items-center'>
      <h1 className='font-bold text-[40px] text-center mb-[40px]'>{categoryName}</h1>
      <div className="grid grid-cols-5 gap-[20px] mb-[100px]">
        {products.map((item, key) => (
          <Link to={"/product/"+item.product._id} className='border border-black w-[220px] h-[300px] overflow-hidden cursor-pointer flex flex-col items-center pt-[10px]'>
            <img className="max-w-[100%] max-h-[200px]" src={process.env.REACT_APP_BACKEND_URL + "/" + item.thumb.image} alt="" />
            <div className="font-semibold text-[18px] mt-[8px] ml-[8px]">{item.product.name}</div>
            <div className="text-[16px] mt-[8px] ml-[8px]">{item.product.price} tk</div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default ProductsByCategory