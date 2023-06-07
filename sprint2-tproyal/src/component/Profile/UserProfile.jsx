import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import loginService from "../../service/loginService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import userService from "../../service/userService";
import { format } from "date-fns";

function UserProfile() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFormChangePassword, setShowFormChangePassword] = useState(false);
  const [userDetail, setUserDetail] = useState();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  }, []);

  useEffect(() => {
    const detail = async () => {
      try {
        const res = await userService.getUserDetail();
        setUserDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    detail();
  }, [token]);

  if (!userDetail) {
    return null;
  }

  return (
    <>
      <div>
        <div className="row mx-0 p-5">
          <div className="container p-5 shadow-cosmetics-1" style={{marginTop: "70px"}}>
            <div className="row">
              <div className="col-3 mt-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={userDetail?.avatar}
                    className="border-avatar rounded-circle"
                    width="80%"
                    height="80%"
                    alt="avatar"
                  />
                  <Link
                    to="/profile-edit"
                    className="btn btn-outline-success mt-3"
                  >
                    Chỉnh sửa thông tin
                  </Link>
                </div>
              </div>
              <div className="col-9">
                <div className="row ms-3 px-3">
                  <h2 className="text-center text-dieucosmetics">
                    THÔNG TIN CÁ NHÂN
                  </h2>
                  <div className="col-6 px-0">
                    <table className="fs-5 font-table text-secondary">
                      <thead>
                        <tr>
                          <th className="th-dieucosmetics">Họ và tên :</th>
                          <td>{userDetail?.name}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="th-dieucosmetics">Giới tính :</th>
                          <td>{userDetail?.gender === false ? "Nam" : "Nữ"}</td>
                        </tr>
                        <tr>
                          <th className="th-dieucosmetics">Ngày sinh :</th>
                          <td>
                            {format(
                              new Date(userDetail?.dateOfBirth),
                              "dd/MM/yyyy"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="th-dieucosmetics"
                            style={{ width: "220px" }}
                          >
                            Email :
                          </th>
                          <td className="w-50">{userDetail?.email}</td>
                        </tr>
                        <tr>
                          <th className="th-dieucosmetics">Địa chỉ :</th>
                          <td>{userDetail?.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <Formik
                      initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      }}
                      validationSchema={Yup.object({
                        oldPassword: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .min(5, "Tên phải chứa ít nhất 5 ký tự")
                          .max(20, "Tên không được vượt quá 20 ký tự"),
                        newPassword: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .min(5, "Tên phải chứa ít nhất 5 ký tự")
                          .max(20, "Tên không được vượt quá 20 ký tự"),
                        confirmPassword: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .min(5, "Tên phải chứa ít nhất 5 ký tự")
                          .max(20, "Tên không được vượt quá 20 ký tự"),
                      })}
                      onSubmit={(value) => {
                        const changePassword = async () => {
                          try {
                            await loginService.changePassword(value);
                            localStorage.removeItem("token");
                            Swal.fire({
                              icon: "success",
                              title:
                                "Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            document.getElementById(
                              "oldPasswordErr"
                            ).innerHTML = "";
                            document.getElementById(
                              "newPasswordErr"
                            ).innerHTML = "";
                            document.getElementById(
                              "confirmPasswordErr"
                            ).innerHTML = "";
                            navigate("/login");
                          } catch (error) {
                            const err = error.response.data;
                            console.log(err);
                            if (
                              err.message === "Mật khẩu hiện tại không đúng"
                            ) {
                              document.getElementById(
                                "oldPasswordErr"
                              ).innerHTML = "Mật khẩu hiện tại không đúng";
                            }

                            if (
                              err.message ===
                              "Mật khẩu mới không được trùng với mật khẩu cũ"
                            ) {
                              document.getElementById(
                                "newPasswordErr"
                              ).innerHTML =
                                "Mật khẩu mới không được trùng với mật khẩu cũ";
                            }

                            if (
                              err.message ===
                              "Mật khẩu xác nhận không trùng khớp"
                            ) {
                              document.getElementById(
                                "confirmPasswordErr"
                              ).innerHTML =
                                "Mật khẩu xác nhận không trùng khớp";
                            }
                          }
                        };
                        changePassword();
                      }}
                    >
                      <Form>
                        <table className="fs-5 font-table text-secondary">
                          <thead>
                            <tr>
                              <th
                                className="th-dieucosmetics"
                                style={{ width: "60%" }}
                              >
                                Số điện thoại :
                              </th>
                              <td>{userDetail?.phoneNumber}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="th-dieucosmetics">
                                <span
                                  type="button"
                                  onClick={() => {
                                    setShowFormChangePassword(
                                      !showFormChangePassword
                                    );
                                  }}
                                  className="text-dieucosmetics"
                                >
                                  {showFormChangePassword
                                    ? "Ẩn đổi mật khẩu"
                                    : "Đổi mật khẩu"}
                                </span>
                              </th>
                              <td></td>
                            </tr>

                            {showFormChangePassword && (
                              <>
                                <tr>
                                  <th className="th-dieucosmetics ">
                                    Mật khẩu hiện tại :
                                  </th>
                                  <td className="fs-6 position-relative">
                                    <Field
                                      id="mk-1"
                                      type={
                                        showOldPassword ? "text" : "password"
                                      }
                                      className="form-control "
                                      name="oldPassword"
                                    />
                                    {showOldPassword ? (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowOldPassword(!showOldPassword);
                                        }}
                                        className="bi bi-eye-slash-fill position-absolute top-50 translate-middle-y me-2 end-0"
                                      ></i>
                                    ) : (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowOldPassword(!showOldPassword);
                                        }}
                                        className="bi bi-eye-fill position-absolute top-50 translate-middle-y me-2 end-0"
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <td>
                                    <span
                                      className="text-danger fs-6"
                                      id="oldPasswordErr"
                                    ></span>
                                    <ErrorMessage
                                      name="oldPassword"
                                      component="div"
                                      className="text-danger err-msg mb-3"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th className="th-dieucosmetics ">
                                    Mật khẩu mới :
                                  </th>
                                  <td className="fs-6 position-relative">
                                    <Field
                                      id="mk-2"
                                      type={
                                        showNewPassword ? "text" : "password"
                                      }
                                      className="form-control"
                                      name="newPassword"
                                    />
                                    {showNewPassword ? (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowNewPassword(!showNewPassword);
                                        }}
                                        className={`bi bi-eye-slash-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                      ></i>
                                    ) : (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowNewPassword(!showNewPassword);
                                        }}
                                        className={`bi bi-eye-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <td>
                                    <span
                                      className="text-danger fs-6"
                                      id="newPasswordErr"
                                    ></span>
                                    <ErrorMessage
                                      name="newPassword"
                                      component="div"
                                      className="text-danger err-msg mb-3"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th className="th-dieucosmetics ">
                                    Mật khẩu xác nhận :
                                  </th>

                                  <td className="fs-6 position-relative">
                                    <Field
                                      id="mk-3"
                                      type={
                                        showConfirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control"
                                      name="confirmPassword"
                                    />
                                    {showConfirmPassword ? (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowConfirmPassword(
                                            !showConfirmPassword
                                          );
                                        }}
                                        className={`bi bi-eye-slash-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                      ></i>
                                    ) : (
                                      <i
                                        type="button"
                                        onClick={() => {
                                          setShowConfirmPassword(
                                            !showConfirmPassword
                                          );
                                        }}
                                        className={`bi bi-eye-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <td>
                                    <span
                                      className="text-danger fs-6"
                                      id="confirmPasswordErr"
                                    ></span>
                                    <ErrorMessage
                                      name="confirmPassword"
                                      component="div"
                                      className="text-danger err-msg mb-3"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th style={{ height: "60px" }}></th>
                                  <th className="fs-6">
                                    <button
                                      type="submit"
                                      className="btn btn-outline-primary"
                                    >
                                      Xác nhận
                                    </button>
                                  </th>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
