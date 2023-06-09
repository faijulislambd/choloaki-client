import useInstructors from "../../../hooks/useInstructors";
import UserCard from "../../Shared/UserCard/UserCard";

const Instructors = () => {
  const [instructors] = useInstructors();
  return (
    <div>
      {instructors.map((instructor) => (
        <UserCard user={instructor} key={instructor._id}></UserCard>
      ))}
    </div>
  );
};

export default Instructors;
