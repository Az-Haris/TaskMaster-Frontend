import axios from 'axios'


const axiosPublic = axios.create({
    // baseURL: import.meta.env.VITE_BACKEND_URI,
    baseURL: "https://taskmaster-backend-mocha.vercel.app",
    withCredentials: false,
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;