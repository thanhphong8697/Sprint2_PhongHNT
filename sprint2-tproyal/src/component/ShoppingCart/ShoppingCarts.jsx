import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartDetailService from "../../service/cartDetailService";
import ModalDeleteCartDetail from "../Modal/ModalDeleteCartDetail";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paymentService from "../../service/paymentService";

export default function Pay() {
  const [cartDetails, setCartDetails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });

  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("roles");
  let total = 0;
  if (cartDetails.length !== 0) {
    total = cartDetails?.reduce((acc, cartDetail) => {
      return acc + cartDetail.quantity * cartDetail.productDTO.price;
    }, 0);
  }

  const handlePayment = async () => {
    if (!role) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn phải đăng nhập để thực hiện thanh toán",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else if (total === 0) {
      Swal.fire({
        icon: "error",
        title: "Chưa có sản phẩm trong giỏ hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const res = await paymentService.pay({ amount: total });
      window.location.href = res.data.url;
    }
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      await cartDetailService.update(id, 1);
      let newIsUpdate = { ...isUpdate };
      setIsUpdate(newIsUpdate);
    } catch (error) {
      console.warn(error);
      const errMsg = error.response.data;
      if (errMsg === "Số lượng không đủ") {
        toast.warn("Số lượng sản phẩm không đủ");
      }
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {
      await cartDetailService.update(id, -1);
      let newIsUpdate = { ...isUpdate };
      setIsUpdate(newIsUpdate);
    } catch (error) {
      console.warn(error);
      const errMsg = error.response.data;
      if (errMsg === "Lỗi") {
        let newIsUpdate = { ...isUpdate };
        setIsUpdate(newIsUpdate);
      }
    }
  };

  const handleTransferInfo = (deletedObject) => {
    setDeletedObject((prev) => ({ ...prev, ...deletedObject }));
  };

  const handleDelete = async () => {
    try {
      await cartDetailService.remove(deletedObject.deletedId);
      let newIsUpdate = { ...isUpdate };
      setIsUpdate(newIsUpdate);
    } catch (error) {
      console.warn(error);
      Swal.fire({
        icon: "error",
        title: "Xóa thât bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  useEffect(() => {
    const getCartDetails = async () => {
      const cartDetailsResponse = await cartDetailService.findAll();
      setCartDetails(cartDetailsResponse.data);
    };
    getCartDetails();
  }, [isUpdate]);

  return (
    <>
      <div className="Cart_cart-page__kClbp pt-5" style={{marginTop: "70px"}}>
        {cartDetails.length === 0 ? (
          <div className="Cart_empty-cart__kp5dY d-flex justify-content-center" style={{height: "450px", marginTop: "200px"}}>
            <div className="EmptyCart_empty-cart__nVgTZ">
              <img
                src="https://365cafe.vn/assets/images/no-cart.png"
                alt="empty-cart"
              />
              <p>
                Tiếc quá! TP Royal không tìm thấy sản phẩm <br /> nào trong giỏ
                hàng của bạn.
              </p>
              <button className="Button_pc-button__GX6DG Button_warning__N__4t text-center">
              <Link to={"/list"}>Tiếp tục mua hàng</Link>
            </button>
            </div>
          
          </div>
        ) : (
          <div className="Cart_content__gK7Nu container">
            <div className="Cart_box__FKQ6C d-flex justify-content-between">
              <div className="CartList_cart-list-container__3Ph23">
                <div className="CartList_cart-list__yYyqP">
                  <div className="CartList_header__uYc74 d-flex justify-content-between">
                    <span className="CartList_title__2MGsm">
                      <svg
                        width={10}
                        height={16}
                        stroke="#112950"
                        viewBox="0 0 10 16"
                        fill="none"
                        style={{ marginRight: "1rem" }}
                      >
                        <path
                          d="M8.5 15L1.5 8L8.5 1"
                          stroke="inherit"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Giỏ hàng
                    </span>
                    <a className="CartList_btn-delete-cart__QOMVr">
                      <span>Xóa tất cả giỏ hàng</span>
                    </a>
                  </div>
                  <div className="CartList_content__uSLn0">
                    <table>
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th className="CartList_product__0438x">Sản phẩm</th>
                          <th>Đơn giá</th>
                          <th>Số lượng</th>
                          <th>Thành tiền</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {cartDetails.map((cartDetail, index) => (
                          <tr
                            name="UHJvZHVjdFZhcmlhbnQ6MjUxMDg="
                            className="CartItem_cart-item__oeS59"
                            key={index}
                          >
                            <td className="CartItem_product-col__5yb6n">
                              <a href="/pmc-khau-trang-soft-fit-goi-5-cai-pink.html">
                                <figure>
                                  <img
                                    src={
                                      cartDetail.productDTO.productImgDTOS[0]
                                        .url
                                    }
                                    alt={cartDetail.productDTO.name}
                                  />
                                </figure>
                                <h3>
                                  <div className="">
                                    {cartDetail.productDTO.name}
                                  </div>
                                  <span className="CartItem_price-mobile__WHuZS">
                                    <p className="CartItem_oldPadding__OfPNE">
                                      <del />
                                    </p>
                                    <p className="CartItem_price-current__qT_vp">
                                      {" "}
                                      {cartDetail.productDTO.price.toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </p>
                                  </span>
                                </h3>
                              </a>
                            </td>
                            <td className="CartItem_price-col___nuBR">
                              <p className="CartItem_price-current__qT_vp">
                                {cartDetail.productDTO.price.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            </td>
                            <td className="CartItem_quantity-col__f1SqD">
                              <div>
                                <div className="Quantity_quantity__fVK1i CartItem_quantity-input__5mxnE">
                                  <button
                                    onClick={() =>
                                      handleDecreaseQuantity(cartDetail.id)
                                    }
                                  >
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.58341 10.8334C4.47291 10.8334 4.36693 10.7895 4.28879 10.7114C4.21065 10.6332 4.16675 10.5273 4.16675 10.4167V9.58341C4.16675 9.47291 4.21065 9.36693 4.28879 9.28879C4.36693 9.21065 4.47291 9.16675 4.58341 9.16675H15.4167C15.5273 9.16675 15.6332 9.21065 15.7114 9.28879C15.7895 9.36693 15.8334 9.47291 15.8334 9.58341V10.4167C15.8334 10.5273 15.7895 10.6332 15.7114 10.7114C15.6332 10.7895 15.5273 10.8334 15.4167 10.8334H4.58341Z"
                                        fill="#112950"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    id={`quantity${cartDetail.id}`}
                                    value={cartDetail.quantity}
                                  />
                                  <button
                                    onClick={() =>
                                      handleIncreaseQuantity(cartDetail.id)
                                    }
                                  >
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M9.99992 3.33325C9.7789 3.33325 9.56694 3.42105 9.41066 3.57733C9.25438 3.73361 9.16658 3.94557 9.16658 4.16659V9.16658H4.16659C3.94557 9.16658 3.73361 9.25438 3.57733 9.41066C3.42105 9.56694 3.33325 9.7789 3.33325 9.99992C3.33325 10.2209 3.42105 10.4329 3.57733 10.5892C3.73361 10.7455 3.94557 10.8333 4.16659 10.8333H9.16658V15.8333C9.16658 16.0543 9.25438 16.2662 9.41066 16.4225C9.56694 16.5788 9.7789 16.6666 9.99992 16.6666C10.2209 16.6666 10.4329 16.5788 10.5892 16.4225C10.7455 16.2662 10.8333 16.0543 10.8333 15.8333V10.8333H15.8333C16.0543 10.8333 16.2662 10.7455 16.4225 10.5892C16.5788 10.4329 16.6666 10.2209 16.6666 9.99992C16.6666 9.7789 16.5788 9.56694 16.4225 9.41066C16.2662 9.25438 16.0543 9.16658 15.8333 9.16658H10.8333V4.16659C10.8333 3.94557 10.7455 3.73361 10.5892 3.57733C10.4329 3.42105 10.2209 3.33325 9.99992 3.33325V3.33325Z"
                                        fill="#112950"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="CartItem_total-price-col__2edyM">
                              <p>
                                {" "}
                                {(
                                  cartDetail.quantity *
                                  cartDetail.productDTO.price
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </p>
                            </td>
                            <td className="CartItem_action__BM8qk">
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() =>
                                  handleTransferInfo({
                                    deletedId: cartDetail.id,
                                    deletedName: cartDetail.productDTO.name,
                                  })
                                }
                              >
                                <svg
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M19.3238 9.4668C19.3238 9.4668 18.7808 16.2018 18.4658 19.0388C18.3158 20.3938 17.4788 21.1878 16.1078 21.2128C13.4988 21.2598 10.8868 21.2628 8.27881 21.2078C6.95981 21.1808 6.13681 20.3768 5.98981 19.0458C5.67281 16.1838 5.13281 9.4668 5.13281 9.4668"
                                    stroke="#5E6F88"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20.708 6.23828H3.75"
                                    stroke="#5E6F88"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.4406 6.239C16.6556 6.239 15.9796 5.684 15.8256 4.915L15.5826 3.699C15.4326 3.138 14.9246 2.75 14.3456 2.75H10.1126C9.53358 2.75 9.02558 3.138 8.87558 3.699L8.63258 4.915C8.47858 5.684 7.80258 6.239 7.01758 6.239"
                                    stroke="#5E6F88"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="CartList_promotion-hint__F3h62">
                  Lưu ý: Các hình thức khuyến mãi sẽ áp dụng tại trang thanh
                  toán (nếu có)
                </div>
              </div>
              <div className="TotalCart_total-cart-container__zIAY9">
                <div className="TotalCart_total-cart__mIMtg">
                  <div className="TotalCart_header__ufGnv">Tổng tiền</div>
                  <div className="TotalCart_content__AMkpM">
                    <div className="TotalCart_item__a1Lt_">
                      <span>Tạm tính</span>
                      <p>
                        <b>
                          {total.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="TotalCart_footer__ysUJW d-flex justify-content-between">
                    <button className="TotalCart_btn-order-more__sjocf">
                      <Link to={"/list"}>
                        <p>
                          <b style={{ color: "green" }}>Mua thêm</b>
                        </p>
                      </Link>
                    </button>
                    <button
                      className="TotalCart_btn-start-checkout___8Dt7"
                      onClick={() => handlePayment()}
                    >
                      <p>
                        <b>Thanh toán</b>
                        <svg
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                        >
                          <path
                            d="M8.5 5L15.5 12L8.5 19"
                            stroke="inherit"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </p>
                      <span>Giao tận nơi hoặc nhận tại cơ sở</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <ModalDeleteCartDetail
        deletedName={deletedObject.deletedName}
        onCompletedDelete={handleDelete}
      />
    </>
  );
}
