import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "react-material-ui-carousel";
import pic1 from "../../images/pic1.png"
import pic2 from "../../images/pic2.png"
import pic3 from "../../images/pic3.png"

const Slider = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const images = [
    pic1,
    pic2,
    pic3,
  ];
  return (
    <div className="outerDiv" data-aos="fade-up-left">
    <Carousel 
    indicatorIconButtonProps={{
        style: {
            padding: '3px',    // 1
            color: 'grey',      
        }
    }}
    activeIndicatorIconButtonProps={{
        style: {
            // border: '5px solid #e91e63',
            color: '#FF8C32' // 2
        }
    }}
    // indicatorContainerProps={{
    //     style: {
    //         // marginTop: '50px',
    //         // textAlign: 'right' 
    //     }
    //   }}
      >
      {images &&
        images.map((item, i) => (
          <img
            className="CarouselImage"
            key={i}
            src={item}
            alt={`${i} Slide`}
          />
        ))}
    </Carousel>
    </div>
  );
};

export default React.memo(Slider);
