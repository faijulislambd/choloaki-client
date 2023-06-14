import { useContext } from "react";
import { UserContext } from "../../../providers/AuthProviders";
import useInsertCart from "../../../hooks/useInsertCart";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ClassesCard = ({ cls }) => {
  const { user } = useContext(UserContext);
  const [, refetch] = useInsertCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [axiosIntercept] = useAxiosIntercept();
  const [seatsCount, setSeatsCount] = useState(cls.seats);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/role/${user?.email}`)
      .then((data) => setRole(data.data.role));
  }, []);

  const handleAddToCart = async (item) => {
    const { name, image, price, _id } = item;
    if (user && user.email) {
      const cartItem = {
        course_id: _id,
        name,
        image,
        price,
        email: user.email,
      };
      const response = await axiosIntercept.post("cart", cartItem);
      if (response.status === 200) {
        const updatedSeat = { seats: seatsCount - 1 };
        setSeatsCount(seatsCount - 1);
        const updateSeatCount = await axiosIntercept.patch(
          `classes/seat/${_id}`,
          updatedSeat
        );
        if (updateSeatCount.status === 200) {
          console.log("Seats Updated");
        }

        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Enrolment Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "You are not logged in?",
        text: "Please login to enroll in the course!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div
      className={`card w-96 shadow-xl ${
        seatsCount === 0 ? "bg-red-500" : "bg-base-200"
      }`}
    >
      <figure className="relative">
        <img
          src={cls.image}
          alt={cls.name}
          className="h-80 object-cover w-full"
        />
        <div className="absolute badge badge-primary top-3 right-3 px-3 py-4 text-sm font-semibold">
          ${cls.price}
        </div>
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{cls.name}</h2>
        <div>
          <strong>Instructor:</strong> {cls.class_instructor}
        </div>
        <div>
          <strong>Available Seats:</strong> {seatsCount}
        </div>

        <div className="card-actions items-center mt-4">
          <button
            className="btn btn-primary"
            disabled={
              seatsCount <= 0 || role === "admin" || role === "instructor"
                ? true
                : false
            }
            onClick={() => handleAddToCart(cls)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassesCard;
