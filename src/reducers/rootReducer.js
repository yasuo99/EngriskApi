import { combineReducers } from "redux";
import authReducer from "./authReducer";
import examReducer from "./examReducer";
import postReducer from "./postReducer";
import sidenavReducer from "./sidenavReducer";
import wordReducer from "./wordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    word: wordReducer,
    exam: examReducer,
    sidenav: sidenavReducer,
    post: postReducer
});

export default rootReducer;
