const initialState = {
    collapse: true,
    levelOne: '',
    levelTwo: '',
}
const sidenavReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Collapse":
            return { ...state, collapse: true }
        case "Expand":
            return { ...state, collapse: false }
        case "SelectLevelOne":
            return { ...state, levelOne: action.data }
        case "SelectLevelTwo":
            return { ...state, levelTwo: action.data }
        default:
            return state;
    };
}
export default sidenavReducer;