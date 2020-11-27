import { toast } from "react-toastify"
var initialState = {
    authError_Email: null,
    authError_Pass: null
};

const wordReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_WORDS":
            toast("Test");
            return state;
        default: return state;
    }
};

export default wordReducer;