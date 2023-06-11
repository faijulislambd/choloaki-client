import HeadTitle from "../../../components/HeadTitle";
import PageTitle from "../../../components/PageTitle";
import ClassesCard from "../../Shared/ClassesCard/ClassesCard";
import useApprovedClasses from "../../../hooks/useApprovedClasses";

const Courses = () => {
  const [approvedClasses] = useApprovedClasses();

  return (
    <>
      <PageTitle title="Classes"></PageTitle>
      <section className="py-10">
        <HeadTitle first="Our" last="Classes"></HeadTitle>
        <div className="grid gap-4 gap-y-10 grid-cols md:grid-cols-3">
          {approvedClasses.map((cls) => (
            <ClassesCard cls={cls} key={cls._id}></ClassesCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Courses;
