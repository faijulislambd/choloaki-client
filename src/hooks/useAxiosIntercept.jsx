import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useAxiosIntercept = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const axiosIntercept = axios.create({
    baseURL: "http://localhost:5000",
  });

  //   useEffect(() => {
  //     axiosIntercept.interceptors.request.use((config) => {
  //       const token = localStorage.getItem("access-token");
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     });

  //     axiosIntercept.interceptors.response.use(
  //       (response) => response,
  //       async (error) => {
  //         if (
  //           error.response &&
  //           (error.response.status === 401 || error.response.status === 403)
  //         ) {
  //           await logOut();
  //           navigate("/login");
  //         }
  //         return Promise.reject(error);
  //       }
  //     );
  //   }, [logOut, navigate, axiosIntercept]);

  return [axiosIntercept];
};

export default useAxiosIntercept;
