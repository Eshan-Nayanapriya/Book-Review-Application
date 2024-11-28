import axios from "axios";
import SummaryApi, { baseURL } from "../config/Summary.api";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

//sending access token to the header
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken');
        
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//refreshing the access token
Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originalRequest = error.config
        
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true;

            const refreshToken = localStorage.getItem('refreshToken')
            if(refreshToken){
                const newAccessToekn = await refreshAccessToken(refreshToken)
                if(newAccessToekn){
                    originalRequest.headers.Authorization = `Bearer ${newAccessToekn}`
                    return Axios(originalRequest) 
                }
            }
        }
        return Promise.reject(error)
    }
)

const refreshAccessToken = async(refreshToken)=>{
    try{
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        console.log("response",response)
        localStorage.setItem('accessToken', accessToken)
        return accessToken
    }catch(error){
        console.log("error occured",error)
    }
}
export default Axios;