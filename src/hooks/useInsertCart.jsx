import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";

const useInsertCart = () => {
  const { user } = useContext(UserContext);
  const [axiosIntercept] = useAxiosIntercept();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept.get(`cart?email=${user?.email}`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return [cart, refetch];
};

export default useInsertCart;
