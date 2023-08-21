import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "../types"

const init = {
    show: false,
    message: "",
    type: "",
}

const snakbarReducer = (state = init, action = {}) => {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                ...state,
                show: true,
                message: action.payload.message,
                type: action.payload.type
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                show: false,
                message: "",
                type: "",
            }
        default:
            return state;
    }
}

export default snakbarReducer;