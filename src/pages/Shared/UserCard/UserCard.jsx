const UserCard = ({ user }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 dark:bg-primary shadow-xl">
        <figure>
          <img src={user.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
