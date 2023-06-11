import { FaTrash } from "react-icons/fa";
import useInsertCart from "../../../hooks/useInsertCart";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useGetSeat from "../../../hooks/useGetSeat";

const MyCart = () => {
  const [axiosIntercept] = useAxiosIntercept();
  // const [loading, setLoading] = useState(true);
  const [getClassSeat, currentSeat, loading] = useGetSeat();
  const [cart, refetch] = useInsertCart();
  // const [currentSeat, setCurrentSeat] = useState(0);
  // const {
  //   data: seat = [],
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery("seat", fetchData);
  const handleCartDelete = async (id, course_id) => {
    await getClassSeat(course_id);
    if (!loading) {
      console.log(currentSeat);
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!loading) {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(async (data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Course Deleted!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
                const oldSeat = { seats: currentSeat + 1 };

                const updateSeatCount = await axiosIntercept.patch(
                  `classes/seat/${course_id}`,
                  oldSeat
                );
                if (updateSeatCount.status === 200) {
                  console.log("Seats Updated");
                }
              }
            });
        }
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem, index) => (
              <tr key={cartItem._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img src={cartItem.image} alt={cartItem.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cartItem.name}</div>
                    </div>
                  </div>
                </td>
                <td>${cartItem.price}</td>
                <th>
                  <button
                    className="badge badge-primary text-xs px-3 py-4"
                    onClick={() =>
                      handleCartDelete(cartItem._id, cartItem.course_id)
                    }
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCart;
