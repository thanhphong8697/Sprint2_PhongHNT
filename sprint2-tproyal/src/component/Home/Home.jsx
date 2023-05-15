import React from "react";
import { useEffect } from "react";

var myIndex = 0;
let timeOut;

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  timeOut = setTimeout(carousel, 4000);
}

function Home() {
  useEffect(() => {
    carousel();
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, []);

  return (
    <>
      <div style={{ marginTop: 72, height: 650 }}>
        {/* Automatic Slideshow Images */}
        <div className="mySlides w3-display-container w3-center">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/10/phong-khach-pop7.jpg"
            style={{ width: "100%", height: 650 }}
          />
          <div className="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small"></div>
        </div>
        <div className="mySlides w3-display-container w3-center">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/10/phong-an-bui4.jpg"
            style={{ width: "100%", height: 650 }}
          />
          <div className="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small"></div>
        </div>
        <div className="mySlides w3-display-container w3-center">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/10/ban-an-pio.jpg"
            style={{ width: "100%", height: 650 }}
          />
          <div className="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small"></div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <div className="row">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2022/07/mau-phong-khach-nha-xinh-banner-27722.jpg"
              style={{ width: "100%" }}
            />
          </div>
          <div className="row mt-4 ms-4">
            <div className="col-8">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2022/07/mau-phong-ngu-nx-banner-27722.jpg"
                style={{ height: "400px", width: "100%" }}
              />
            </div>
            <div className="col-4 text-center pe-5 pt-5">
              {" "}
              <h3>Không gian phòng ngủ</h3>
              <p>
                Những mẫu phòng ngủ của TP Royal mang đến cảm giác ấm cúng, gần
                gũi và thoải mái.
              </p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row ">
            <div className="col-4 text-center">
              <div className="pe-4">
                <h3>Không gian phòng khách</h3>
                <p>
                  Phòng khách là không gian chính của ngôi nhà, là nơi sum họp
                  gia đình.
                </p>
              </div>
              <div className="ps-5" style={{ marginTop: "100px" }}>
                <h3>Đồ trang trí</h3>
                <p>
                  Mang lại những nguồn cảm hứng và nét sinh động cho không gian.
                </p>
              </div>
            </div>
            <div className="col-8">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2022/09/hang-trang-tri-nx-12-9-22.jpg"
                style={{ height: "400px" }}
              />
            </div>
          </div>
          <div className="row mt-4 me-4">
            <img src="https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22.jpg" />
          </div>
          <div className="mt-3">
            <h3>Không gian phòng ăn</h3>
            <p>
              Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian
              phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt.
            </p>
          </div>
        </div>
      </div>
      <div
        className="row mt-4"
        style={{ height: "400px", marginRight: "23px", marginLeft: "23px", marginBottom: "400px"}}
      >
        <img src="https://nhaxinh.com/wp-content/uploads/2023/02/PHONG-NGU-CABO-CHON-THU-THAI-MOI-NGAY.jpg" />
      </div>
      <div className="row">
      <div className="row mt-5 p-0 me-0">
        <div className="col-6 p-0">
        <img style={{ height: "400px", width: "100%" }} src="https://nhaxinh.com/wp-content/uploads/2022/04/bo-suu-tap-osaka-moi-dep-1037x800.jpg" />
        </div>
        <div className="col-3 ps-5 pe-5 text-center pt-5 " style={{ backgroundColor: "#EBEBEB" }}>
        <h2>Thiết kế nội thất</h2>
        <p>Quý khách có thể gặp đội ngũ tư vấn thiết kế chuyên nghiệp để được hướng dẫn hay tư vấn giúp quý khách hàng thực hiện trọn vẹn ý thích của mình.</p>
        <button type="button" class="btn btn-outline-dark">Xem ngay</button>
        </div>
        <div className="col-3 p-0">
        <img style={{ height: "400px", width: "100%" }} src="https://nhaxinh.com/wp-content/uploads/2022/04/thiet-ke-noithat-dep-nhaxinh-525x800.jpg" />
        </div>
      </div>
      </div>
      <div className="row mt-5">
        <div className="col-6 text-center" style={{ backgroundColor: "#EBEBEB", paddingTop: "150px" }}>
            <h2>
            Tổ ấm của người tinh tế
            </h2>
            <p>
            Trong suốt hơn 22 năm qua, cảm hứng từ gu thẩm mỹ tinh tế và tinh thần “Việt” đã giúp Nhà Xinh tạo ra những thiết kế độc đáo, hợp thời và chất lượng. Nhà Xinh hiện đã mở 10 cửa hàng tại Việt Nam.
            </p>
        </div>
        <div className="col-6 p-0">
        <img style={{ height: "400px", width: "100%" }} src="https://nhaxinh.com/wp-content/uploads/2022/07/gioi-thieu-nha-xinh-moi-25-7-22-1200x800.jpg" />
        </div>
      </div>
      
      
    </>
  );
}

export default Home;
