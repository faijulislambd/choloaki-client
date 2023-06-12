import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";

const useInstructors = () => {
  const { user } = useContext(UserContext);
  const [axiosIntercept] = useAxiosIntercept();

  const { refetch, data: instructors = [] } = useQuery({
    queryKey: ["instructors", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept.get(`instructors`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [instructors, refetch];
};

export default useInstructors;
