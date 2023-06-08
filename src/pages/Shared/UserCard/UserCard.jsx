const UserCard = ({ user }) => {
  return (
    <div>
      "class_instructor": {user.name} - "instructor_email": {user.email}
    </div>
  );
};

export default UserCard;
