import useInstructors from "../../../hooks/useInstructors";
import UserCard from "../../Shared/UserCard/UserCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import HeadTitle from "../../../components/HeadTitle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper";
const Instructors = () => {
  const [instructors] = useInstructors();

  return (
    <section className="mb-10">
      <HeadTitle first="Our" last="Teacher"></HeadTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        modules={[Navigation, Autoplay]}
        navigation={true}
        className="mySwiper"
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor._id}>
            <UserCard user={instructor}></UserCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Instructors;
