import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: classes = [] } = useQuery({
    queryKey: ["instructors", user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/classes`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return [classes, refetch];
};

export default useClasses;
