import axios from "axios";
import { useState } from "react";
import useAxiosIntercept from "./useAxiosIntercept";

const useGetSeat = () => {
  const [currentSeat, setCurrentSeat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [axiosIntercept] = useAxiosIntercept();

  const getClassSeat = async (seat) => {
    await axiosIntercept
      .get(`classes/seat/${seat}`)
      .then((res) => {
        if (res.status === 200) {
          setCurrentSeat(res.data.seats);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return [getClassSeat, currentSeat, loading];
};

export default useGetSeat;
