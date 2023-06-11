import ClassesCard from "../../Shared/ClassesCard/ClassesCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import HeadTitle from "../../../components/HeadTitle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import useApprovedClasses from "../../../hooks/useApprovedClasses";

const TopClasses = () => {
  const [approvedClasses] = useApprovedClasses();
  return (
    <section className="mb-10">
      <HeadTitle first="Our" last="Classes"></HeadTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        modules={[Autoplay, Navigation]}
        navigation={true}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {approvedClasses.map((cls) => (
          <SwiperSlide key={cls._id}>
            <ClassesCard cls={cls}></ClassesCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopClasses;
