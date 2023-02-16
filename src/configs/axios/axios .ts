import axios from "axios";
import { getCookie } from "../cookie-helper/cookieHelper";
let token = getCookie("token") as string;

const axiosInstance: any = axios.create({
  baseURL: "http://api.mega.grp/api/v1/",
  maxRedirects: 5,
  headers: {
    token: token,
    "Content-Type": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default axiosInstance;
