import { combineReducers } from "redux";
import authReducer from "./authReducer";
import xemThemReducer from "./xemThemReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    xemthem: xemThemReducer,
});

export default rootReducer;
