import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, redirect, useLocation } from 'react-router-dom'
import client from '../utilities/client'
import { Alert, Snackbar } from '@mui/material'
import LoadingButton from '../components/ButtonLoader'
import jwt from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/user/userAction'
const Login = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [submitButtonLoadin, setSubmitButtonLoading] = useState(false);
    const serachParameter = new URLSearchParams(useLocation().search);
    const user = useSelector(state => state.user)
    if (user) {
        if (serachParameter.get("path")) {
            window.location = serachParameter.get("path");
        }
        else window.location = "/"
    }
    const dispatch = useDispatch();
    const [message, setMessage] = useState({
        type: "error",
        msg: "Error"
    })
    const [details, setDetails] = useState({
        email: "",
        password: "",
    })
    const submitLogin = () => {
        setSubmitButtonLoading(true);
        client.post("/auth/login", details).then(res => {
            setSubmitButtonLoading(false);
            if (res.data.status) {
                localStorage.setItem("token", res.data.token);
                const data = jwt(res.data.token);
                dispatch(userLogin(data));
                if (serachParameter.get("path")) {
                    window.location = serachParameter.get("path");
                }
                else window.location = "/"
                setMessage({
                    type: "success",
                    msg: res.data.message
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
                    <p>Account email address</p>
                    <input value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="text" />
                </div>
                <div className='w-full mt-[20px]'>
                    <p>Account password</p>
                    <input value={details.password} onChange={e => setDetails({ ...details, password: e.target.value })} className='h-[40px] border border-gray-400 w-full outline-none box-border mt-[10px] pl-[10px] text-[16px]' type="password" />
                </div>

                <LoadingButton open={submitButtonLoadin} onClick={submitLogin} className='bg-orange-500 text-white w-full mt-[40px] h-[40px] rounded-[6px]'>
                    Sign in
                </LoadingButton>
                <Link className='mt-[20px] mb-[40px]' to={"/registration"}>
                    <p className='text-gray-500'>Create new account</p>
                </Link>
            </div>

        </div>
    )
}

export default Login