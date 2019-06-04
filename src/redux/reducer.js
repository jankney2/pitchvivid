const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    id: null, 
    companyId: null, 
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
                firstName: payload.firstName, 
                lastName: payload.lastName, 
                email: payload.email, 
                id: payload.id,
                companyId: payload.companyId,
                owner: payload.owner
            };
        case LOGOUT:
            return {
                firstName: '',
                lastName: '',
                email: '',
                id: null, 
                companyId: null, 
                owner: false
            };
        default :
            return state;
    }
}