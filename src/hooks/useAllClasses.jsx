import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useAllClasses = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: allClasses = [] } = useQuery({
    queryKey: ["allClasses", user?.email],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/admin/classes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return [allClasses, refetch];
};

export default useAllClasses;
