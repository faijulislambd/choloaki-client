import { useContext } from "react";
import { UserContext } from "../../../providers/AuthProviders";
import useInsertCart from "../../../hooks/useInsertCart";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";

const ClassesCard = ({ cls }) => {
  const { user } = useContext(UserContext);
  const [, refetch] = useInsertCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [axiosIntercept] = useAxiosIntercept();

  const hangleAddToCart = async (item) => {
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
        cls.seats === 0 ? "bg-red-400" : "bg-base-200"
      }`}
    >
      <figure className="relative">
        <img src={cls.image} alt="Shoes" />
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
          <strong>Available Seats:</strong> {cls.seats}
        </div>
        <div className="card-actions items-center mt-4">
          <button
            className="btn btn-primary"
            disabled={cls.seats <= 0 ? true : false}
            onClick={() => hangleAddToCart(cls)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassesCard;
