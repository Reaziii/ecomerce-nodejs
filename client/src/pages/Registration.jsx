import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import client from '../utilities/client'
import { Alert, Snackbar } from '@mui/material'
import LoadingButton from '../components/ButtonLoader'

const Registraion = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [submitButtonLoadin, setSubmitButtonLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "error",
        msg: "Error",

    })
    const [details, setDetails] = useState({
        email: "",
        password: "",
        zipCode: 0,
        phoneNumber: "",
        address: "",
        name: "",
    })
    const submitLogin = () => {
        setSubmitButtonLoading(true);
        client.post("/auth/registration", details).then(res => {
            console.log(res.data);
            if (res.data.status) {
                setMessage({
                    type: "success",
                    msg: res.data.message,
                })
                setSnackbarOpen(true);
            }
            else {

                setMessage({
                    type: "error",
                    msg: res.data.message
                })
                setSnackbarOpen(true);
            }
            setSubmitButtonLoading(false);
        })
    }
    return (
        <div>
            <Header />
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={6000}
            >
                <Alert severity={message.type}>{message.msg}</Alert>
            </Snackbar>
            <div className='w-[400px] p-[20px] mt-[100px] m-auto flex flex-col justify-start items-center border border-black'>
                <h1 className='font-semibold text-[30px]' >Sign In</h1>
                <div className='w-full mt-[20px]'>
                    <p>Your full name</p>
                    <input value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Your phone number</p>
                    <input value={details.phoneNumber} onChange={e => setDetails({ ...details, phoneNumber: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Your  address</p>
                    <input value={details.address} onChange={e => setDetails({ ...details, address: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Your zip code</p>
                    <input value={details.zipCode} onChange={e => setDetails({ ...details, zipCode: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="number" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Account email address</p>
                    <input value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Account password</p>
                    <input value={details.password} onChange={e => setDetails({ ...details, password: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>

                <LoadingButton open={submitButtonLoadin} onClick={submitLogin} className='bg-orange-500 text-white w-full mt-[40px] h-[40px] rounded-[6px]'>Sign Up</LoadingButton>
                <Link className='mt-[20px] mb-[40px]' to={"/login"}>
                    <p className='text-gray-500'>Already have account? Sign in</p>
                </Link>
            </div>

        </div>
    )
}

export default Registraion