const Payment = ({ cartItems, totalPrice }) => {
  return (
    <>
      <div>Total Items : {cartItems.length}</div>
      <div>Total Price : {totalPrice}</div>
    </>
  );
};

export default Payment;
