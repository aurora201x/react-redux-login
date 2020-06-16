import * as actions from "../constants";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false, // true代表用户已经登录，false代表未登录
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      }; // 刷新时，本地localSession还有数据，但redux里没有了，需要重新登录
    default:
      return state;
  }
};

export default auth;
