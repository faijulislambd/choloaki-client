import PageTitle from "../../../components/PageTitle";
import Banner from "../Banner/Banner";
import Instructors from "../Instructors/Instructors";

const Home = () => {
  return (
    <>
      <PageTitle title="Home"></PageTitle>
      <div>
        <Banner></Banner>
        <Instructors></Instructors>
      </div>
    </>
  );
};

export default Home;
