import axios from "axios";

export const userSignupRequest = (userData) => (dispatch) => {
  //thunk
  return axios.post("/api/users", userData); // onSubmit发送数据
};

export const isUserExists = (username) => (dispatch) => {
  return axios.get(`/api/users/${username}`, username);
};
