import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";
import useAuth from "./useAuth";

const useAllClasses = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();

  const { refetch, data: allClasses = [] } = useQuery({
    queryKey: ["allClasses", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept.get("admin/classes");

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [allClasses, refetch];
};

export default useAllClasses;
