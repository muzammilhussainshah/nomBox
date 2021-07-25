import ActionTypes from '../Constant/constant';

const INITIAL_STATE = {
    isLoggedIn: false,
    isLoader: false,
    isError: false,
    errorMessage: '',
    emailCredentials: {},
    socialCredentials: {},
    chefsArray: [],
    carouselIndex: '',
    Chats: [],
    Sessions: [],
    // allSessions: [],
    currentLoc: null,
    roles: null,
    orderDetails: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOADER:
            return ({
                ...state,
                isLoader: !state.isLoader
            })
        case ActionTypes.SHOWERROR:
            return ({
                ...state,
                isLoader: !state.isLoader,
                isError: !state.isError,
                errorMessage: action.payload
            })
        case ActionTypes.HIDEERROR:
            return ({
                ...state,
                isError: false,
                errorMessage: ''
            })


        case ActionTypes.ISLOGGEDIN:
            return ({
                ...state,
                isLoggedIn: true
            })
        case ActionTypes.EMAILCREDENTIALS:
            return ({
                ...state,
                emailCredentials: action.payload
            })
        case ActionTypes.SOCIALCREDENTIALS:
            return ({
                ...state,
                socialCredentials: action.payload
            })
        case ActionTypes.ROLES:
            return ({
                ...state,
                roles: action.payload
            })
        case ActionTypes.GETCHATS:
            let allChats = state.Chats.concat(action.payload)
            // allChats.push(action.payload)
            return ({
                ...state,
                Chats: allChats
            })
        // case ActionTypes.GETALLSESSIONS:
        //     let getAllSessions = state.allSessions.concat(action.payload)
        //     // allChats.push(action.payload)
        //     return ({
        //         ...state,
        //         allSessions: getAllSessions
        //     })
        case ActionTypes.ACTIVESESSION:

            if (action.payload == null) {
                return ({
                    ...state,
                    Sessions: []
                })
            }
            else {
                let allSessions = state.Sessions.concat(action.payload)
                return ({
                    ...state,
                    Sessions: allSessions
                })
            }
        // allChats.push(action.payload)

        case ActionTypes.GETCHEFS:
            return ({
                ...state,
                chefsArray: action.payload
            })
        case ActionTypes.CURRENTLOC:
            return ({
                ...state,
                currentLoc: action.payload
            })
        case ActionTypes.CAROUSELINDEX:
            return ({
                ...state,
                carouselIndex: action.payload
            })
        case ActionTypes.ORDERDETAILS:
            let orderDetailsArray = state.orderDetails.concat(action.payload)
            console.log(orderDetailsArray, "orderDetailsArray--->Reducer")
            return ({
                ...state,
                orderDetails: orderDetailsArray
            })
        case ActionTypes.CLEARREDUXSTATE:
            return {
                chefsArray: [],
                carouselIndex: ''
            };
        case ActionTypes.ORDERDETAILSCLEAR:
            return {
                ...state,
                orderDetails: []
            };
        case ActionTypes.CLEARROLES:
            return {
                ...state,
                roles: null
            };
        case ActionTypes.CLEARSTATE:
            return {
                // emailCredentials: {},
                // socialCredentials: {},
                // chefsArray: [],
                // carouselIndex: '',
                // Chats: []
                isLoggedIn: false,
                isLoader: false,
                isError: false,
                errorMessage: '',
                emailCredentials: {},
                socialCredentials: {},
                chefsArray: [],
                carouselIndex: '',
                Chats: [],
                Sessions: [],
                currentLoc: null,
                roles: null,
                orderDetails: []
                // allSessions: [],

            };
        case ActionTypes.CLEARCHAT:
            return {
                ...state,
                Chats: []
            };
        case ActionTypes.CLEARSESSIONS:
            return {
                ...state,
                Sessions: []
            };


        default:
            return state;
    }

}