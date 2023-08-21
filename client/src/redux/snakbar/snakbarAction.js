import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "../types";

export const showSnakbar = (type, message) => ({
    type: OPEN_SNACKBAR,
    payload: {
        type: type ? "success" : "false", message
    }
})

export const closeSnakbar = () => ({
    type: CLOSE_SNACKBAR,
})
