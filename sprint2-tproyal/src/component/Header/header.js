import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../service/userService";
import cartDetailService from "../../service/cartDetailService";
export default function Header() {
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const [userDetail, setUserDetail] = useState();
  const navigate = useNavigate();

  const detail = async () => {
    try {
        const res = await userService.getUserDetail();
        setUserDetail(res.data);
    } catch (error) {
        console.log(error);
    }
};
  useEffect(() => {
    detail();
}, [token]);
const handleLogout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  localStorage.removeItem("name");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  navigate("/");
};
  return (
    <>
      <header className="">
        <nav className="header-fixed border-bottom border-color">
          <div
            style={{ backgroundColor: "#fff" }}
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom"
          >
            <a
              href="#"
              className="d-flex align-items-center ms-5 col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
              style={{ marginRight: "-220px" }}
            >
              <img width="150px" src="src\Hannah.png" alt="" />
            </a>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link
                  to="/"
                  className="nav-link  px-4  text-secondary  text-hover "
                >
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li>
                <Link
                  to="/list"
                  className="nav-link  px-4  text-secondary  text-hover "
                >
                  SẢN PHẨM
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  KHUYẾN MÃI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  HỖ TRỢ
                </a>
              </li>
            </ul>

          
            <div className="me-5 fs-4 ">
              <div className="float-start">
                {token === null ? (
                  <Link
                    to={"/login"}
                    type="button"
                    className=" ms-5 bi bi-person "
                  ></Link>
                ) : (
                  <div>
                  <div className=" ms-5">
                    <div className="dropdown">
                      <a
                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div
                          className="fs-6"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <img
                            src={userDetail?.avatar}
                            className="rounded-circle border border-1 border-color"
                            alt="avatar"
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                      </a>
                      <ul
                        className="dropdown-menu p-0"
                        aria-labelledby="navbarDropdownMenuAvatar"
                      >
                        <li>
                                  <Link to='/profile' className="dropdown-item button-buys">
                                      Thông tin cá nhân
                                  </Link>
                              </li>
                              <li>
                                  <Link to='/cart-detail' className="dropdown-item button-buys">
                                      Lịch sử mua hàng
                                  </Link>
                              </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item button-buys"
                            href="#"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  </div>
                )}
              </div>
              <div className="float-end cart-container">
                <Link
                  to={`/shopping`}
                >
                  {" "}
                  <i type="button" className=" ms-3 me-1 pe-1 bi bi-cart3 "></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
