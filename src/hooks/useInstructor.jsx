import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosIntercept from "./useAxiosIntercept";

const useInstructor = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    queryFn: async () => {
      const res = await axiosIntercept.get(`/user/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
