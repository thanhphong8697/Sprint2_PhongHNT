import React from "react";
import SlideDetail from "../util/SlideDetail";
import Header from "../Header/header";
import Footer from "../Footer/footer";

function Detail() {
  return (
    <>
      <Header />
      <div className="row p-0 pb-5 pt-5" style={{ backgroundColor: "#E9EBEC" }}>
        <div className="col-2 pt-5"></div>
        <div className="col-5 pt-5">
          <SlideDetail />
        </div>
        <div className="col-3 pt-5">
          <div className="right">
            <div className="pname">Bàn làm việc Hopper 38929P</div>
            <div className="ratings">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
            <div className="size">
              <p>
                Giá: <span>29,900,000₫</span>
              </p>
            </div>
            <div className="size">
              <p>
                Kích thước: <span>D1400- R500-C770 mm</span>
              </p>
            </div>
            <div className="size">
              <p>
                Vật liệu: <span>Gỗ keo</span>
              </p>
            </div>
            <div className="size">
              <p>
                Danh mục: <span>Bàn làm việc</span>
              </p>
            </div>
            <div className="quantity">
              <p>
                Quantity :{" "}
                <span>
                  <input type="number" min={1} max={5} defaultValue={1} />
                </span>
              </p>
            </div>
            <div className="btn-box">
              <button className="cart-btn">Add to Cart</button>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="col-2 pt-5"></div>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
