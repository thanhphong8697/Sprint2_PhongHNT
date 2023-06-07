import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider(props) {
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
        {props.imgList.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt="" width={"90%"} style={{height:'340px'}} />
          </div>
        ))}
      </Slider>
      <h4>Hình ảnh khác</h4>
      <Slider
        asNavFor={nav1}
        ref={slider2}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {props.imgList.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt="" width={"60%"} style={{height: '70px'}}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}