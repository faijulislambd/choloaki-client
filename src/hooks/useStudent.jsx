import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosIntercept from "./useAxiosIntercept";

const useStudent = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: isStudent, isLoading: isStudentLoading } = useQuery({
    queryKey: ["isStudent", user?.email],
    queryFn: async () => {
      const res = await axiosIntercept.get(`/user/student/${user?.email}`);
      return res.data.student;
    },
  });
  return [isStudent, isStudentLoading];
};

export default useStudent;
