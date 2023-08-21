import { LOGIN, LOGOUT } from "../types";

const init = null;

const userReducer = (state = init, action = {}) => {
    switch (action.type) {
        case LOGIN:
            return { ...action.payload };
        case LOGOUT:
            localStorage.removeItem("token");
            window.location.href = window.location.origin;
            return null;
        default:
            return state;
    }
};

export default userReducer;