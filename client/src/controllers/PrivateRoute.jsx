import React from 'react'
import { useSelector } from 'react-redux'
import { redirect, useLocation, Redirect, useNavigate, Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component = <></> }) => {
    const user = useSelector(state => state.user);
    const path = useLocation().pathname;
    const navigate = useNavigate();
    
    return <>
        {user? <Component/> : <Navigate to={`/login?path=${path}`}/>}
    </>;
}

export default PrivateRoute