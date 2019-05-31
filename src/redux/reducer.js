const initialState = {
    username: '',
    email: '',
    id: null, 
    companyid: null, 
    owner: false
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT= 'LOGOUT';

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logoutUser(){
    return {
        type: LOGOUT
    }
}

export default function reducer(state=initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_USER: 
            return {
                ...state,
                username: payload.username, 
                email: payload.email, 
                id: payload.id,
                companyid: payload.companyid,
                owner: payload.owner
            };
        case LOGOUT:
            return {
                username: '',
                email: '',
                id: null, 
                companyid: null, 
                owner: false
            };
        default :
            return state;
    }
}