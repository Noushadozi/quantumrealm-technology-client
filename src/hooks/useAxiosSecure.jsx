import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://quantumrealm-technology-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure