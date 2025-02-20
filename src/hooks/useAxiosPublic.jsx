import axios from 'axios'


const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    withCredentials: false,
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;