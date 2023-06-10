import { useEffect } from "react";
import HeadTitle from "../../../components/HeadTitle";
import PageTitle from "../../../components/PageTitle";
import ClassesCard from "../../Shared/ClassesCard/ClassesCard";
import { useState } from "react";

const Courses = () => {
  const [availableClasses, setAvailableClasses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/classes/approved`)
      .then((res) => res.json())
      .then((data) => setAvailableClasses(data));
  }, []);

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
