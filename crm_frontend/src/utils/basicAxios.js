import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const basicAxios = axios.create({
  baseURL: baseURL,
});

export const setAuthHeader = (authTokens) => {
  if (authTokens) {
    basicAxios.defaults.headers.common["Authorization"] = `Bearer ${authTokens.access}`;
  } else {
    delete basicAxios.defaults.headers.common["Authorization"];
  }
};

export default basicAxios;
