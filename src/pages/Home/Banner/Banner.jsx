import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import slider1 from "./../../../assets/sliders/img-1.jpg";
import slider2 from "./../../../assets/sliders/img-2.jpg";
import slider3 from "./../../../assets/sliders/img-3.jpg";

const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false}
      interval={2000}
      animation="cubeAnimation"
      bullets={false}
      className="h-[700px] object-cover"
    >
      <div data-src={slider1} />
      <div data-src={slider2} />
      <div data-src={slider3} />
    </AutoplaySlider>
  );
};

export default Banner;
