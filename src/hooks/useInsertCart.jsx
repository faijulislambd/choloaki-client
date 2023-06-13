import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "./useAxiosIntercept";
import useAuth from "./useAuth";
import { useState } from "react";

const useInsertCart = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await axiosIntercept.get(`cart?email=${user?.email}`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      return response.data;
    },
  });
  return [cart, refetch, loading];
};

export default useInsertCart;
