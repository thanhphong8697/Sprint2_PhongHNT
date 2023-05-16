import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlideDetail() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div>
      <Slider asNavFor={nav2} ref={slider1}>
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/Ban-lam-viec-Hopper-38929P-600x400.jpg"
            alt=""
            width={"90%"}
          />
        </div>
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/BAN-LAM-VIEC-HOPPER-WOOD-METAL-38929P-2-600x387.jpg"
            alt=""
            width={"90%"}
          />
        </div>
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/BAN-LAM-VIEC-HOPPER-WOOD-METAL-38929P-3-600x387.jpg"
            alt=""
            width={"90%"}
          />
        </div>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={slider2}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/Ban-lam-viec-Hopper-38929P-600x400.jpg"
            alt=""
            width={'60%'}
          />
        </div>
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/BAN-LAM-VIEC-HOPPER-WOOD-METAL-38929P-2-600x387.jpg"
            alt=""
            width={'60%'}
          />
        </div>
        <div>
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/12/BAN-LAM-VIEC-HOPPER-WOOD-METAL-38929P-3-600x387.jpg"
            alt=""
            width={'60%'}
          />
        </div>
      </Slider>
    </div>
  );
}