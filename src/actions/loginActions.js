import axios from "axios";

export const login = (data) => (dispatch) => {
  return axios.post("/api/auth", data);
};
