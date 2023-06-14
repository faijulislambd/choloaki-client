import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useInstructors = () => {
  const { user } = useAuth();

  const { refetch, data: instructors = [] } = useQuery({
    queryKey: ["instructors", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `https://cholo-aki-server.vercel.app/instructors`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [instructors, refetch];
};

export default useInstructors;
