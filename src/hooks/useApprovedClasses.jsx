import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useApprovedClasses = () => {
  const { user } = useAuth();
  const { refetch, data: approvedClasses = [] } = useQuery({
    queryKey: ["approvedClasses", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/classes/approved"
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [approvedClasses, refetch];
};

export default useApprovedClasses;
