import { combineReducers } from 'redux';

import { getSellerIdFromAuthentication} from './getSellerIdFromAuthReducer';
import { getSellerIdFromAuthentication2 } from './getSellerIdFromAuthReducer2';

const rootReducer = combineReducers({
    
    get_seller_profile_id: getSellerIdFromAuthentication,
    get_user_id:getSellerIdFromAuthentication2

});
export default rootReducer;