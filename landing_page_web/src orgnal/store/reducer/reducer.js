import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    currentUser:'',
    users: [],
    messages: {},
    recipientID: '',
    formSuccess:false,
    type:''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.TYPE:
            return ({
                ...state,
                type: action.payload
            })
        case ActionTypes.FORMSUCCESS:
            return ({
                ...state,
                formSuccess: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })   
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            }) 
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                recipientID: action.payload
            })
        case ActionTypes.MESSAGES:
            return ({
                ...state,
                messages: action.payload
            })
        default:
            return state;
    }

}