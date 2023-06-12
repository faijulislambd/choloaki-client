import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";
import useAuth from "./useAuth";

const useApprovedClasses = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { refetch, data: approvedClasses = [] } = useQuery({
    queryKey: ["approvedClasses", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept.get("classes/approved");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [approvedClasses, refetch];
};

export default useApprovedClasses;
