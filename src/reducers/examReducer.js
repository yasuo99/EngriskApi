import { toast } from "react-toastify"
const initialState = {
    result: {}
};
const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMIT_EXAM":
            toast("Nộp bài thành công");
            return {
                ...state,
                result:action.result
            }
        default:
            return state;
    }
}
export default examReducer;