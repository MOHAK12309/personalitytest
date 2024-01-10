import { getUserId} from "./actionTypes";

export const getUserIdFromAuth2 = (user_id) => {
    return {
        type: getUserId.GET_USER_ID,
        payload: {
            user_id,
           
      
        }
        
    };
};

export const removeUserIdFromAuth2 = (removed) => {
    return {
        type: getUserId.REMOVE_USER_ID,
        payload: removed
    };
};