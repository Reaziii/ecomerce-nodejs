import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Header from '../components/Header';
import client from '../utilities/client';
import ProductsByCategory from '../components/ProductsByCategory';
const Home = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        client.get("/banner/active").then(res => {
            if (res.data.status) {
                setBanners([...res.data.banners])
            }
            console.log(res.data)
        })
        client.get("/category").then(res => {
            if (res.data.status) {
                setCategories([...res.data.categories])
            }
        })

    }, [])
    return (
        <div>
            <Header />
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper">
                {
                    banners.map((item, key) => (
                        <SwiperSlide className='h-[100vh] w-full'>
                            <img className='h-[100vh] w-full' src={process.env.REACT_APP_BACKEND_URL + "/" + item.path} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {
                categories.map((item, key) => (
                    <ProductsByCategory categoryName={item.name} categoryId={item._id} />
                ))
            }
        </div >
    )
}

export default Home