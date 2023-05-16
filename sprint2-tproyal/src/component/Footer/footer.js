export default function Footer() {
  return (
    <>
      <footer className="footer-04" style={{backgroundColor: '#303036'}}>
        <div className="container">
          <div className="row">
            <div className="col-3 mb-md-0 mb-4">
              <h2 className="footer-heading">
                <a href="#" className="logo">
                  THÔNG TIN LIÊN HỆ :
                </a>
              </h2>
              <p style={{color: "white"}}>
                103 - 105 Nguyễn Hữu Thọ, Quận Hải Châu, Thành Phố Đà Nẵng
              </p>
              <p style={{color: "white"}}>Tel: 84-236-3847 333/888</p>
              <p style={{color: "white"}}>Email: thanhphong@gmai.com</p>
              <a href="#">
                Xem thêm <span className="ion-ios-arrow-round-forward"></span>
              </a>
            </div>
            <div className="col-3 mb-md-0 mb-4 text-center">
              <h2 className="footer-heading">TP Royal</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="py-1 d-block">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 d-block">
                    Đổi trả hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 d-block">
                    Tổng công ty
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 d-block">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 mb-md-0 mb-4">
              <h2 className="footer-heading">Loại sản phẩm</h2>
              <div className="tagcloud">
                <a href="#" className="tag-cloud-link">
                  Bàn học
                </a>
                <a href="#" className="tag-cloud-link">
                  Bàn ăn
                </a>
                <a href="#" className="tag-cloud-link">
                  Giường
                </a>
                <a href="#" className="tag-cloud-link">
                  Ghế
                </a>
                <a href="#" className="tag-cloud-link">
                  Tủ áo
                </a>
                <a href="#" className="tag-cloud-link">
                  Tủ bếp
                </a>
                <a href="#" className="tag-cloud-link">
                  Kệ giày
                </a>
                <a href="#" className="tag-cloud-link">
                  Tủ trưng bày
                </a>
              </div>
            </div>
            <div className="col-3 mb-md-0 mb-4">
              <h2 className="footer-heading">Đăng ký</h2>
              <form action="#" className="subscribe-form">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Nhập email của bạn"
                  />
                  <button
                    type="submit"
                    className="form-control submit rounded-right"
                  >
                    <span className="sr-only">Nhập</span>
                    <i className="ion-ios-send"></i>
                  </button>
                </div>
              </form>
              <h2 className="footer-heading mt-5">Theo dõi thông tin</h2>
              <ul className="ftco-footer-social p-0">
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Twitter"
                  >
                    <span className="ion-logo-twitter"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Facebook"
                  >
                    <span className="ion-logo-facebook"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Instagram"
                  >
                    <span className="ion-logo-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
