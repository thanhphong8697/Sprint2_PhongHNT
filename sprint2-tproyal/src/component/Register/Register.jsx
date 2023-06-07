import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../../service/loginService";
import Swal from "sweetalert2";
import * as Yup from "yup";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const getMinDate = () => {
    const today = new Date();
    return new Date(
      today.getFullYear() - 16,
      today.getMonth(),
      today.getDate()
    );
  };

  useEffect(() => {
    document.title = "Đăng Ký";
  }, []);

  return (
    <>
      <div
        className="login-container"
        style={{
          background:
            'url("") top center / cover no-repeat',
        }}
      >
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{
                    borderRadius: 15,
                    background: "none",
                    border: "2px solid",
                  }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                      Đăng ký tài khoản
                    </h3>
                    <Formik
                      initialValues={{
                        name: "",
                        username: "",
                        email: "",
                        password: "",
                        gender: "",
                        dateOfBirth: "",
                        address: "",
                        phoneNumber: "",
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string()
                          .required("Trường này bắt buộc nhập")
                         ,
                        password: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .min(5, "Tên phải chứa ít nhất 5 ký tự")
                          .max(20, "Tên không được vượt quá 20 ký tự"),
                        email: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .email("Sai format email"),
                        phoneNumber: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .matches(
                            "^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[\\d]{7}$",
                            "Số điện thoại phải đúng định dạng 090xxxxxxx hoặc 091xxxxxxx hoặc (84)+90xxxxxxx hoặc (84)+91xxxxxxx."
                          ),
                        address: Yup.string().required(
                          "Trường này bắt buộc nhập"
                        ),
                        dateOfBirth: Yup.date()
                          .required("Trường này bắt buộc nhập")
                          .max(getMinDate(), "Bạn phải từ 16 tuổi trở lên"),
                        username: Yup.string()
                          .required("Trường này bắt buộc nhập")
                          .matches(
                            "^[a-zA-Z0-9]*$",
                            "Tên đăng nhập không được chứa ký tự đặc biệt"
                          )
                          .min(5, "Tên phải chứa ít nhất 5 ký tự")
                          .max(20, "Tên không được vượt quá 20 ký tự"),
                      })}
                      onSubmit={(values) => {
                        const register = async () => {
                          try {
                            await loginService.register(values);
                            Swal.fire({
                              icon: "success",
                              title:
                                "Đăng Ký thành công, Hãy đăng nhập để vào website",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            document.getElementById("username-err").innerText =
                              "";
                            document.getElementById("email-err").innerText = "";
                            navigate("/login");
                          } catch (error) {
                            console.log(error);
                            const err = error.response.data;
                            if (err === "Tên đăng ký đã tồn tại!") {
                              document.getElementById(
                                "username-err"
                              ).innerText = "Tên đăng ký đã tồn tại!";
                            } else if (err === "Email đã tồn tại!") {
                              document.getElementById("email-err").innerText =
                                "Email đã tồn tại!";
                            }
                          }
                        };
                        register();
                      }}
                    >
                      <Form>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="name">
                                Họ và Tên <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="username">
                                Tên đăng ký
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                id="username"
                                className="form-control form-control-lg"
                                name="username"
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="text-danger"
                              />
                              <span
                                id="username-err"
                                className="text-danger"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4 d-flex align-items-center">
                            <div className="form-outline datepicker w-100">
                              <div>
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  Mật khẩu
                                  <span className="text-danger">*</span>
                                </label>
                              </div>
                              <div className="position-relative">
                                <Field
                                  type={showPassword ? "text" : "password"}
                                  className="form-control form-control-lg"
                                  id="password"
                                  name="password"
                                />
                                {showPassword ? (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                    className="bi bi-eye-slash-fill position-absolute top-50 translate-middle-y me-2 end-0"
                                  ></i>
                                ) : (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                    className="bi bi-eye-fill position-absolute top-50 translate-middle-y me-2 end-0"
                                  ></i>
                                )}
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <h6 className="mb-2 pb-1">Giới tính: </h6>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="true"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                Nữ
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="false"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Nam
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="email">
                                Email <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                              <span
                                id="email-err"
                                className="text-danger"
                              ></span>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="phoneNumber"
                              >
                                Số điện thoại
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="address">
                                Địa chỉ <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="address"
                                id="address"
                                name="address"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="dateOfBirth"
                              >
                                Ngày sinh <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-control form-control-lg"
                              />
                              <ErrorMessage
                                name="dateOfBirth"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            className="btn btn-primary me-3"
                            type="submit"
                          >
                            Đăng ký
                          </button>
                          <Link className="btn btn-secondary" to={"/login"}>
                            Hủy
                          </Link>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;