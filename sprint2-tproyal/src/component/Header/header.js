import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{height: "75px", backgroundColor: "#FFFFFF"}}
      >
        <div className="container-fluid">
          <a className="navbar-brand" style={{margin: "0px 40px"}}>
            <img
              src=""
              style={{width: "75px"}}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                to="/"
                className="nav-link active me-4"
                aria-current="page"
                style={{color: "black"}}
              >
                TRANG CHỦ
              </NavLink>
              <NavLink
                to="/facility"
                className="nav-link active me-4"
                aria-current="page"
                style={{color: "black"}}
              >
                SẢN PHẨM
              </NavLink>
              <NavLink
                to="/customer"
                className="nav-link active me-4"
                aria-current="page"
                style={{color: "black"}}
              >
                BỘ SƯU TẬP
              </NavLink>
              <NavLink
                to="/contract"
                className="nav-link active me-4"
                aria-current="page"
                style={{color: "black"}}
              >
                THIẾT KẾ NỘI THẤT
              </NavLink>            
            </div>
          </div>
          <div className="fs-5 search-container" style={{marginLeft:"155px"}}>
              <i class="bi bi-search">
                <span className='ms-2 position-absolute' style={{
                  bottom: '3px'
                }}>|</span>
              </i>
              <input type='text' style={{height: "38px"}} className='form-control search-product ' placeholder='Tìm kiếm sản phẩm' />
            </div>
          <div className='float-start ms-5'>
                <NavLink to={'/login'} type="button" className=" ms-5 bi bi-person fs-3">
                </NavLink>
              </div>
              <div className='float-end cart-container'>
                <i type="button" className=" ms-3 bi bi-cart3 fs-4">
                </i>
                <span className='cart-number'>0</span>
              </div>
        </div>
      </nav>
    </>
  );
}
