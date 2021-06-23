const initial = {
    route: {
        sections: []
    },
    typeRoute: {
        engrisk: [],
        public: [],
        private: []
    }
}
const routeReducer = (state = initial, action) => {
    switch (action.type) {
        case "SELECT_ROUTE":
            return {
                ...state,
                route: action.route
            }
        case "GET_ALL_ROUTE":
            return {
                ...state,
                typeRoute: action.typeRoute
            }
        default:
            return {
                ...state
            }
    }
}
export default routeReducer