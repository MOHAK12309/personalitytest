import { getUserId } from "../actions/actionTypes";

const initialState = {};

export const getSellerIdFromAuthentication2 = (state = initialState, action) => {
    switch(action.type){
        case getUserId.GET_USER_ID :
            return action.payload
        case getUserId.REMOVE_USER_ID :
            return action.payload
        default :
            return state
    }
        
};