import { toast } from "react-toastify"
var initialState = {
    words: []
};

const wordReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_WORDS":
            toast("Test");
            return state;
        case "PRACTICE":
            toast("Practice");
            return {
                ...initialState,
                words: action.words
            };
        case "DONE": 
            toast('Luyện tập kết thúc');
            return {
                ...initialState,
                words: []
            }
        default: return state;
    }
};

export default wordReducer;