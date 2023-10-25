import { getSellerId} from "./actionTypes";

export const getUserIdFromAuth = (user_id) => {
    return {
        type: getSellerId.GET_SELLER_ID_FROM_AUTH,
        payload: {
            user_id,
          
      
        }
        
    };
};

export const removeSellerIdFromAuth = (removed) => {
    return {
        type: getSellerId.GET_SELLER_ID_FROM_AUTH,
        payload: removed
    };
};