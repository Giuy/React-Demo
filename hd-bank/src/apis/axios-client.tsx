import axios from "axios";
import jwtDecode, { JwtDecodeOptions, JwtPayload } from "jwt-decode";
import moment from "moment";
import queryString from "query-string";
import { appLoading, getToken } from "../helpers/utils";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // const token =
  // const token = getToken();
  // const decodedToken = jwtDecode(token) as JwtPayload;
  // console.log(decodedToken);
  // console.log(moment().valueOf());
  // console.log(new Date().getTime());
  // if (decodedToken * 1000 < moment().valueOf()) {
  //   console.log("Token expired.");
  // } else {
  //   console.log("Valid token");
  //   result = true;
  // }
  // console.log("interceptors.request");
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // console.log("interceptors.response");
    if (response && response.data) {
      if (response.headers["content-type"] === "application/zip") {
        return response;
      }
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    appLoading.dismiss();
    throw error;
  }
);

export default axiosClient;
