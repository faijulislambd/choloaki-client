import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useInsertCart = () => {
  const { user } = useContext(UserContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/cart?email=${user?.email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return [cart, refetch];
};

export default useInsertCart;
