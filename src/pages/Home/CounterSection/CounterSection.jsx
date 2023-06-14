import HeadTitle from "../../../components/HeadTitle";
import useApprovedClasses from "../../../hooks/useApprovedClasses";
import useInstructors from "../../../hooks/useInstructors";
import useStudentCount from "../../../hooks/useStudentCount";
import CountUp from "react-countup";
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
          <div className="stat-value text-primary">
            <CountUp start={0} end={count.count} duration={2} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title font-semibold">Instructors</div>
          <div className="stat-value text-primary">
            <CountUp start={0} end={instructors.length} duration={2} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-title font-semibold">Classes</div>
          <div className="stat-value text-primary">
            <CountUp start={0} end={approvedClasses.length} duration={2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
