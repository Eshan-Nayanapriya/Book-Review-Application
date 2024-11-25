import axios from "axios";
import { baseURL } from "../config/Summary.api";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default Axios;