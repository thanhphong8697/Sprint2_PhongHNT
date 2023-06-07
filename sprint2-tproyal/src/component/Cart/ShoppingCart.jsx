import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartDetailService from "../../service/cartDetailService"
// import ModalDeleteCartDetail from "../../util/ModalDeleteCartDetail";
import ModalDeleteCartDetail from "../Modal/ModalDeleteCartDetail";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paymentService from "../../service/paymentService"
// import { useDispatch, useSelector } from "react-redux";
// import {showListAction} from "../../redux/action/showList"

function ShoppingCart() {
  const [cartDetails, setCartDetails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletedObject, setDeletedObject] = useState({
    deletedId: "",
    deletedName: "",
  });

  const navigate = useNavigate()
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("roles")
  let total = 0;
  if (cartDetails.length !== 0) {
    total = cartDetails?.reduce((acc, cartDetail) => {
      return acc + cartDetail.quantity * cartDetail.productDTO.price;
    }, 0);
  }

  // const dispatch = useDispatch();
  // const cartDetails = useSelector(state => state.carDetails)

  const handlePayment = async () => {
    if (!role) {
      Swal.fire({
        title: 'Thông báo',
        text: "Bạn phải đăng nhập để thực hiện thanh toán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng nhập'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        }
      })
    } else if (total === 0) {
      Swal.fire({
        icon: "error",
        title: "Chưa có sản phẩm trong giỏ hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const res = await paymentService.pay({amount: total})
      window.location.href = res.data.url
    }

  }

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
    const getCartDetails = async () => {
      const cartDetailsResponse = await cartDetailService.findAll();
      setCartDetails(cartDetailsResponse.data);
    };
    getCartDetails();
  }, [isUpdate]);

  // useEffect(() => {
  //   dispatch(showListAction())
  // }, [])

  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: 15 }}
              >
                <div
                  className="card-body p-0"
                  style={{ boxShadow: "8px 8px 16px 8px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="pb-3">
                          <h6 className="mb-0">
                            <Link to={"/product"} className="text-body">
                              <i className="bi bi-arrow-left me-2" />
                              Tiếp tục mua sắm
                            </Link>
                          </h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Giỏ hàng của bạn
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {cartDetails.length} sản phẩm
                          </h6>
                        </div>
                        <hr className="my-4" />
                        {cartDetails.length === 0 ? (
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <img
                              src="data:image/png;base64,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"
                              alt=""
                            />
                          </div>
                        ) : (
                          <>
                            {cartDetails.map((cartDetail, index) => (
                              <div key={index}>
                                <div className="row mb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={
                                        cartDetail.productDTO.productImgDTOS[0]
                                          .url
                                      }
                                      className="img-fluid rounded-3"
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">
                                      {
                                        cartDetail.productDTO.productTypeDTO
                                          .name
                                      }
                                    </h6>
                                    <h6 className="text-black mb-0">
                                      <Link
                                        to={`/product-detail/${cartDetail.productDTO.id}`}
                                        style={{ textDecoration: "none" }}
                                        className="text-black"
                                      >
                                        {cartDetail.productDTO.name}
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex justify-content-around">
                                    <button
                                      style={{
                                        border: "1px solid #12ac4c",
                                        background: "none",
                                      }}
                                      onClick={() =>
                                        handleDecreaseQuantity(cartDetail.id)
                                      }
                                    >
                                      <i className="bi bi-dash-lg pe-1 ps-1"></i>
                                    </button>
                                    <span id={`quantity${cartDetail.id}`}>
                                      {cartDetail.quantity}
                                    </span>
                                    <button
                                      style={{
                                        border: "1px solid rgba(0, 0, 0, 0.5)",
                                        background: "#12ac4c",
                                      }}
                                      onClick={() =>
                                        handleIncreaseQuantity(cartDetail.id)
                                      }
                                    >
                                      <i className="bi bi-plus-lg text-white pe-1 ps-1"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">
                                      {(
                                        cartDetail.quantity *
                                        cartDetail.productDTO.price
                                      ).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <button
                                      className="btn btn-outline-danger"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      onClick={() =>
                                        handleTransferInfo({
                                          deletedId: cartDetail.id,
                                          deletedName:
                                            cartDetail.productDTO.name,
                                        })
                                      }
                                    >
                                      <i className="bi bi-trash" />
                                    </button>
                                  </div>
                                </div>
                                <hr className="my-4" />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 pt-1" style={{marginTop: '45px'}}>
                          Tóm tắt giỏ hàng
                        </h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            {cartDetails.length} sản phẩm
                          </h5>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h5 className="text-uppercase mb-3">Khách hàng: </h5>
                          <h5 className="mb-4 pb-2">{name}</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h5 className="text-uppercase mb-3">Phí giao hàng: </h5>
                          <h5 className="mb-4 pb-2">Miễn phí</h5>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Tổng tiền</h5>
                          <h5>
                            {total.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h5>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark btn-block btn-lg w-100"
                          data-mdb-ripple-color="dark"
                          onClick={() => handlePayment()}
                        >
                          Thanh toán
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />

      <ModalDeleteCartDetail
        deletedName={deletedObject.deletedName}
        onCompletedDelete={handleDelete}
      />
    </>
  );
}

export default ShoppingCart;