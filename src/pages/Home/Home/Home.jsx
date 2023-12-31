import PageTitle from "../../../components/PageTitle";
import Banner from "../Banner/Banner";
import CounterSection from "../CounterSection/CounterSection";
import TopClasses from "../TopClasses/TopClasses";
import TopInstructors from "../TopInstructors/TopInstructors";

const Home = () => {
  return (
    <>
      <PageTitle title="Home"></PageTitle>
      <div>
        <Banner></Banner>
        <TopClasses></TopClasses>
        <TopInstructors></TopInstructors>
        <CounterSection></CounterSection>
      </div>
    </>
  );
};

export default Home;
