import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthorizationToken from "../utils/setAuthorizationToken";
import * as actions from "../constants";

export const setCurrentUser = (user) => {
  return {
    type: actions.SET_CURRENT_USER,
    user,
  };
};

export const login = (data) => (dispatch) => {
  return axios.post("/api/auth", data).then((res) => {
    const token = res.data;
    localStorage.setItem("jwtToken", token); // 也可以存在cookie中
    setAuthorizationToken(token); // 还需要重新再次触发，所以在index.js里再写入一次
    dispatch(setCurrentUser(jwtDecode(token))); // 加密的，需要jwtDecode解密
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  // 取消请求头中的信息
  setAuthorizationToken(false);
  // 清除掉redux中的数据
  dispatch(setCurrentUser({}));
};
