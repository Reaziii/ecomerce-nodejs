import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import snakbarReducer from "./snakbar/snakbarReducer";

const rootReducer = combineReducers({
  user: userReducer,
  snakbar: snakbarReducer
});
export default rootReducer;