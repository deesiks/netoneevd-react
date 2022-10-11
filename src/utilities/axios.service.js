import axios from "axios";

const axiosInstance =  axios.create({
    baseURL: process.env.REACT_APP_API,
});

axiosInstance.interceptors.request.use(
    config => {

        config.headers.common['Access-Control-Allow-Origin'] = '*';

        if(config.url.includes('opn')){
            return config;
        }

        if (!config.url.includes("authenticate")){

            const token = localStorage.getItem("token");

            config.headers.common.Authorization = `Bearer ${token}`
        }

        return config;
    }, error => {
        console.log(error)
    }
)

export default axiosInstance;
