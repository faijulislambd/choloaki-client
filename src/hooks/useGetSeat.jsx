import axios from "axios";
import { useState } from "react";

const useGetSeat = () => {
  const [currentSeat, setCurrentSeat] = useState(0);
  const [loading, setLoading] = useState(true);

  const getClassSeat = async (seat) => {
    await axios
      .get(`http://localhost:5000/classes/seat/${seat}`)
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
