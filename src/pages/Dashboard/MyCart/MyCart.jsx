import { FaTrash } from "react-icons/fa";
import useInsertCart from "../../../hooks/useInsertCart";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import Swal from "sweetalert2";
import { useState } from "react";
import useGetSeat from "../../../hooks/useGetSeat";
import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [axiosIntercept] = useAxiosIntercept();
  const [currentCartID, setCartClassID] = useState(null);
  const [currentClassID, setCurrentClassID] = useState(null);
  const [cartDeleted, setCartDeleted] = useState(false);
  const [getClassSeat, currentSeat, loading] = useGetSeat();
  const [cart, refetch] = useInsertCart();

  const cartRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!loading) {
        if (result.isConfirmed) {
          axiosIntercept
            .delete(`https://cholo-aki-server.vercel.app/cart/${currentCartID}`)
            .then(async (data) => {
              console.log(data.data.deletedCount);
              if (data.data.deletedCount > 0) {
                setCartDeleted(false);
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
                  `classes/seat/${currentClassID}`,
                  oldSeat
                );
                if (updateSeatCount.status === 200) {
                  refetch();

                  console.log("Cart Update");
                }
              }
            });
        }
      }
    });
  };

  const handleCartDelete = async (id, course_id) => {
    await getClassSeat(course_id);
    setCartClassID(id);
    setCurrentClassID(course_id);
    setCartDeleted(true);
  };

  if (currentSeat !== null && currentClassID !== null && cartDeleted)
    cartRemove();
  const reducedCartCost = cart.reduce(
    (sum, item) => parseFloat(item.price) + sum,
    0
  );

  const totalCartCost = parseFloat(reducedCartCost.toFixed(2));

  return (
    <>
      <PageTitle title="My Cart"></PageTitle>
      <div className="stats bg-base-200 text-primary-content w-full mb-4">
        <div className="stat">
          <div className="stat-title text-slate-400">Total Items</div>
          <div className="stat-value text-slate-300 text-md">{cart.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-slate-400">Total Cost</div>
          <div className="stat-value text-slate-300">${totalCartCost}</div>
          <div className="stat-actions">
            <Link
              to="/dashboard/payment"
              className="btn btn-sm btn-primary"
              disabled={cart.length <= 0 ? true : false}
            >
              Pay
            </Link>
          </div>
        </div>
      </div>
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
            {cart.length <= 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No Items Added To Cart Yet{" "}
                </td>
              </tr>
            )}
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
