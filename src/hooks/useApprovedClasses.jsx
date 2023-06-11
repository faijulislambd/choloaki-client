import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useApprovedClasses = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: approvedClasses = [] } = useQuery({
    queryKey: ["approvedClasses", user?.email],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/classes/approved");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return [approvedClasses, refetch];
};

export default useApprovedClasses;
