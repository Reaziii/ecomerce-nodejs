import React from 'react'
import { PulseLoader } from 'react-spinners';
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const LoadingButton = ({ className, open, onClick = () => { }, children }) => {
    return (
        <button onClick={() => {
            if (!open) {
                onClick();
            }
        }} className={className}>
            {
                !open ? children : <PulseLoader
                    color={"white"}
                    loading={open}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            }
        </button>
    )
}

export default LoadingButton