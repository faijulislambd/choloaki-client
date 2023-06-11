import HeadTitle from "../../../components/HeadTitle";
import PageTitle from "../../../components/PageTitle";
import ClassesCard from "../../Shared/ClassesCard/ClassesCard";
import useClasses from "../../../hooks/useClasses";

const Courses = () => {
  const [availableClasses] = useClasses();

  return (
    <>
      <PageTitle title="Classes"></PageTitle>
      <section className="py-10">
        <HeadTitle first="Our" last="Classes"></HeadTitle>
        <div className="grid gap-4 gap-y-10 grid-cols md:grid-cols-3">
          {availableClasses.map((cls) => (
            <ClassesCard cls={cls} key={cls._id}></ClassesCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Courses;
