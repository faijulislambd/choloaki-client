import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";
import useAuth from "./useAuth";

const useTeacherClasses = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();

  const { refetch, data: teacherClasses = [] } = useQuery({
    queryKey: ["teacherClasses", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept(
        `teacher/classes?email=${user.email}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [teacherClasses, refetch];
};

export default useTeacherClasses;
