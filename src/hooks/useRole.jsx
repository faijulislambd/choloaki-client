import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosIntercept from "./useAxiosIntercept";

const useRole = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosIntercept.get(`users/role/${user?.email}`);
      return res.data.role;
    },
  });
  return [role, roleLoading];
};

export default useRole;
