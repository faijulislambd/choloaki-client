import { useEffect } from "react";
import HeadTitle from "../../../components/HeadTitle";
import useApprovedClasses from "../../../hooks/useApprovedClasses";
import useInstructors from "../../../hooks/useInstructors";
import { useState } from "react";
import useStudentCount from "../../../hooks/useStudentCount";

const CounterSection = () => {
  const [approvedClasses] = useApprovedClasses();
  const [instructors] = useInstructors();
  const [count] = useStudentCount();

  return (
    <section className="mb-40 mt-20 md:w-4/5 mx-auto">
      <HeadTitle first="Our" last="Stats"></HeadTitle>
      <div className="stats shadow w-full text-center">
        <div className="stat">
          <div className="stat-figure text-primary"></div>
          <div className="stat-title font-semibold">Students</div>
          <div className="stat-value text-primary">{count.count}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title font-semibold">Instructors</div>
          <div className="stat-value text-primary">{instructors.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title font-semibold">Classes</div>
          <div className="stat-value text-primary">
            {approvedClasses.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
