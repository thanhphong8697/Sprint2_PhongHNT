import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import paymentService from "../../service/paymentService";
import cartService from "../../service/cartService";

function PaymentResult() {
  const [paymentInfo, setPaymentInfo] = useState({
    vnp_Amount: "",
    vnp_BankCode: "",
    customerName: "",
    vnp_CardType: "",
    vnp_OrderInfo: "",
    vnp_PayDate: "",
    vnp_TransactionNo: "",
  });

  const customerName = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const componentBRef = useRef(null);
  const url = window.location.href;

  const handlePrint = useReactToPrint({
    content: () => componentBRef.current,
    pageStyle: "@page { size: A4; margin: 40px; }",
  });

  const handleSendEmail = async () => {
    try {
      await paymentService.sendEmail({
        email,
        customerName,
        code: paymentInfo.vnp_TransactionNo,
        total: paymentInfo.vnp_Amount,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUpdateCart = async () => {
    try {
      await cartService.update({
        code: paymentInfo.vnp_TransactionNo,
        total: paymentInfo.vnp_Amount,
        customerName,
        paymentDate: paymentInfo.vnp_PayDate,
      });
      handleSendEmail();
      navigate("/list");
    } catch (error) {
      console.warn(error);
    }
  };

  const handleFormatDateTime = (dateTimeString) => {
    const parsedDate = new Date(
      dateTimeString.slice(0, 4),
      dateTimeString.slice(4, 6) - 1,
      dateTimeString.slice(6, 8),
      dateTimeString.slice(8, 10),
      dateTimeString.slice(10, 12),
      dateTimeString.slice(12, 14)
    );

    const formattedDate = format(parsedDate, "dd/MM/yyyy");
    const formattedTime = format(parsedDate, "HH:mm:ss");
    return formattedDate + " " + formattedTime;
  };

  useEffect(() => {
    const parsed = queryString.parse(url);
    const str = "http://localhost:3000/payment-info?vnp_Amount";
    const amount = parsed[str].slice(0, -2);
    const dateTimeString = parsed.vnp_PayDate;
    const formattedDateTime = handleFormatDateTime(dateTimeString);

    if (parsed.vnp_TransactionNo !== "0") {
      setPaymentInfo({
        vnp_Amount: +amount,
        vnp_BankCode: parsed.vnp_BankCode,
        customerName,
        vnp_CardType: parsed.vnp_CardType,
        vnp_OrderInfo: parsed.vnp_OrderInfo,
        vnp_PayDate: formattedDateTime,
        vnp_TransactionNo: parsed.vnp_TransactionNo,
      });
    }
  }, [customerName, url]);

  if (!url) {
    window.location.href =
      "https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?backtoken=e507d3062e1048c39d8f3fa82c2f1a26";
  }

  return (
    <>
<div className="d-flex  flex-column align-items-center gap-3 vh-100">
        {paymentInfo.vnp_Amount ? (
          <>
            <img
            src={require("../../img/thanhcong.jpg")}
            alt=""
             width={"5%"}
            />
            <h1 className="text-success">Thanh toán thành công</h1>
          </>
        ) : (
          <>
            <img
             src={require("../../img/thatbai.jpg")}
             alt=""
              width={"5%"}
            />
            <h1 className="text-danger">Thanh toán thất bại</h1>
          </>
        )}

        <div ref={componentBRef}>
          <h2 className="text-center">Thông tin đơn hàng</h2>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <th className="fs-5 pt-3 pb-3">Mã đơn hàng:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_TransactionNo}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Khách hàng:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.customerName}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Ngày thanh toán:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_PayDate}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Tổng tiền:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_Amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Ngân hàng:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_BankCode}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Loại thẻ:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_CardType}
                </td>
              </tr>
              <tr>
                <th className="fs-5 pt-3 pb-3">Nội dung thanh toán:</th>
                <td className="fs-5 text-end pt-3 pb-3">
                  {paymentInfo.vnp_OrderInfo}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {paymentInfo.vnp_Amount ? (
          <div className="d-flex justify-content-center gap-3 ">
            <button
              className="btn btn-secondary"
              onClick={() => handleUpdateCart()}
            >
              Tiếp tục mua sắm
            </button>
<button className="btn btn-primary" onClick={() => handlePrint()}>
              <i className="bi bi-printer-fill"></i> In hóa đơn
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center gap-3 ">
            <Link to={"/"} className="btn btn-secondary">
              Tiêp tục mua sắm
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentResult;