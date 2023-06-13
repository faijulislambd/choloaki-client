import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosIntercept from "./useAxiosIntercept";

const useAdmin = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosIntercept.get(`/user/admin/${user?.email}`);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
