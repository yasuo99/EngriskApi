import { combineReducers } from "redux";
import authReducer from "./authReducer";
import examReducer from "./examReducer";
import sidenavReducer from "./sidenavReducer";
import wordReducer from "./wordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    word: wordReducer,
    exam: examReducer,
    sidenav: sidenavReducer
});

export default rootReducer;
