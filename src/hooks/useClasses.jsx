import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: availableClasses = [] } = useQuery({
    queryKey: ["availableClasses", user?.email],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/classes/approved");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  console.log(availableClasses);
  return [availableClasses, refetch];
};

export default useClasses;
