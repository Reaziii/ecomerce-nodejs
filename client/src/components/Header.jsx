import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../redux/user/userAction';

const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div className='top-0 left-0 w-full h-[80px] bg-[#131921] px-[80px] fixed flex flex-row items-center justify-between z-10'>
            <div className='flex flex-row items-center'>
                <a href="/" className="text-[40px] font-bold text-white p-0 m-0">
                    REVETA
                </a>
                <p className='text-white mx-[20px] p-0 m-0 underline text-center'>Only in<br />Bangladesh</p>
                <div className="bg-white w-[400px] h-[40px] ml-[20px] flex flex-row overflow-hidden rounded-[2px]">
                    <input className='h-[40px] w-full box-border pl-[20px] outline-none border-none' placeholder='Search Reveta' type="text" />
                    <button className='w-[50px] h-[40px] bg-orange-500'>
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
            </div>
            <div
                className='flex flex-row justify-between items-center'
            >

                <Link className='ml-[40px]' to="/myorders">
                    <p className='text-white text-[14px]'>Track my orders</p>
                </Link>
                {
                    user ?
                        <>
                            <Link className='ml-[40px]' to={user.isAdmin ? "/admin-dashboard" : "/profile"}>
                                <p className='text-white text-[14px]'>{user.name}</p>
                            </Link>
                            <div
                                onClick={() => {
                                    dispatch(userLogout())
                                }}

                                className='ml-[40px]'>
                                <p className='text-white text-[14px]'>{"Logout"}</p>
                            </div> </> : <Link className='ml-[40px] text-[14px]' to="/login">
                            <p className='text-white text-[14px]'>Sign in</p>
                        </Link>
                }

            </div>
        </div>
    )
}

export default Header