import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useStudentCount = () => {
  const { user } = useAuth();

  const { refetch, data: count = [] } = useQuery({
    queryKey: ["count", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `https://cholo-aki-server.vercel.app/student/count`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [count, refetch];
};

export default useStudentCount;
