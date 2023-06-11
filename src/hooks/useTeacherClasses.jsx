import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useTeacherClasses = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: teacherClasses = [] } = useQuery({
    queryKey: ["teacherClasses", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/teacher/classes?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return [teacherClasses, refetch];
};

export default useTeacherClasses;
