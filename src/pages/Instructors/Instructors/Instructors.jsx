import HeadTitle from "../../../components/HeadTitle";
import PageTitle from "../../../components/PageTitle";
import useInstructors from "../../../hooks/useInstructors";
import UserCard from "../../Shared/UserCard/UserCard";

const Instructors = () => {
  const [instructors] = useInstructors();
  return (
    <>
      <PageTitle title="Instructors"></PageTitle>
      <section className="py-10">
        <HeadTitle first="Our Esteemed" last="Instructors"></HeadTitle>
        <div className="grid gap-4 gap-y-10 grid-cols md:grid-cols-3">
          {instructors.map((instructor) => (
            <UserCard user={instructor} key={instructor._id}></UserCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Instructors;
