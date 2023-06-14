import { motion } from "framer-motion";
const UserCard = ({ user }) => {
  return (
    <div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <div className="card w-96 bg-base-200 dark:bg-primary shadow-xl">
          <figure>
            <img
              src={user.image}
              alt={user.name}
              className="h-80 object-cover w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
