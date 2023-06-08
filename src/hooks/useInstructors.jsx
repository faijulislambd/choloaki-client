import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useInstructors = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: instructors = [] } = useQuery({
    queryKey: ["instructors", user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/instructors`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return [instructors, refetch];
};

export default useInstructors;
