import { LOGIN, LOGOUT } from "../types";

export const userLogin = (data) => ({
  type: LOGIN,
  payload: { ...data },
});

export const userLogout = () => ({
  type: LOGOUT,
});