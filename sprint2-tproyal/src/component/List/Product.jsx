import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../service/productService";
import cartDetailService from "../../service/cartDetailService";
import { ToastContainer, toast } from "react-toastify";

function Product() {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isAppend, setIsAppend] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productFilter, setProductFilter] = useState({
    page: 0,
    name: "",
  });

  // const handleAddCartDetail = async (productId, productPrice) => {
  //   await cartDetailService.save({
  //     quantity: 1,
  //     productDTO: { id: productId },
  //     total: productPrice,
  //   });
  // };
  const handleAddCartDetail = async (productId, productPrice) => {
    try {
      if (quantity === 0) {
        toast.warn("Hãy chọn số lượng sản phẩm");
      } else {
        await cartDetailService.save({
          quantity: 1,
          productDTO: { id: productId },
          total: productPrice,
        });
        toast.success("Thêm mới thành công");
      }
    } catch (error) {
      console.warn(error);
      const errMsg = error.response.data;
      if (errMsg === "Số lượng không đủ") {
        toast.warn("Số lượng sản phẩm không đủ");
      }
    }
  };

  const handlePageClick = () => {
    setProductFilter((prev) => ({ ...prev, page: prev.page + 1 }));
    setIsAppend(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsResponse = await productService.findByName(productFilter);
        if (isAppend) {
          setProducts((prev) => [...prev, ...productsResponse.data.content]);
          setIsAppend(false);
        } else {
          setProducts(productsResponse.data.content);
        }
        setPageCount(productsResponse.data.totalPages);
        document.getElementById("list-empty").innerHTML = "";
        document.getElementById("load-more").style.display = "block";
      } catch (error) {
        console.warn(error);
        setProducts(error.response.data.content);
        document.getElementById("list-empty").innerHTML =
          "Không tìm thấy kết quả";
        document.getElementById("load-more").style.display = "none";
      }
    };
    getProducts();
  }, [productFilter]);

  useEffect(() => {
    document.title = "Sản phẩm";
  }, []);

  return (
    <>
      <div className="site mb-5" id="page" style={{ marginTop: 95 }}>
        <div className="container">
          <div className="wpb_wrapper">
            <div className="row mb-3">
              <div className="col-3"></div>
              <div className="col-3"></div>
              <div className="col-6">
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  onSubmit={(value) => {
                    setProductFilter((prev) => {
                      return { ...prev, ...value, page: 0 };
                    });
                  }}
                >
                  <div style={{ paddingLeft: "119px", width: "1179px" }}>
                    <Form>
                      <div
                        className="fs-5 search-container"
                        style={{ width: "30%" }}
                      >
                        <i class="bi bi-search">
                          <span
                            className="ms-2 position-absolute"
                            style={{ bottom: "3px" }}
                          >
                            |
                          </span>
                        </i>
                        <Field
                          type="search"
                          className="form-control search-product"
                          style={{ height: "20%" }}
                          placeholder="Tìm kiếm sản phẩm"
                          name="name"
                          id="form1"
                        />
                      </div>
                    </Form>
                  </div>
                </Formik>
              </div>
            </div>
            <div>
              <div className="holder row ">
                {products.map((product, index) => (
                  <div
                    className="product-data col-4 text-center mb-3"
                    key={index}
                  >
                    <div className="product-cards shadow">
                      <div className="product-images">
                        <img
                          src={product.productImgDTOS[0].url}
                          alt=""
                          width={350}
                          height={350}
                        />{" "}
                        <div className="product-overlays">
                          <div
                            className="buttons"
                            style={{ marginTop: "80px" }}
                          >
                            <button
                              className="btn btn-outline-primary m-0 me-1"
                              onClick={() =>
                                handleAddCartDetail(product.id, product.price)
                              }
                              
                            >
                              <i className="bi bi-cart pe-2"></i>
                              Thêm vào giỏ
                            </button>
                            <button className="btn btn-outline-primary m-0 ms-1" >
                              <Link
                                to={`/product-detail/${product.id}`}
                                className="button-details"
                                // style={{marginLeft: "20px"}}
                              >
                                <i className="bi bi-eye pe-2"></i>
                                Chi tiết
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="product-infos"
                        style={{ backgroundColor: "white" }}
                      >
                        <h3 className="product-names">{product.name}</h3>
                        <p
                          className="product-prices"
                          style={{ color: "black" }}
                        >
                          {product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {productFilter.page + 1 === pageCount ? (
              <div className="text-center mt-5" id="load-more"></div>
            ) : (
              <div className="text-center mt-5" id="load-more">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-scale"
                  onClick={() => handlePageClick()}
                >
                  Xem thêm{" "}
                </button>
              </div>
            )}
            <div className="text-center text-danger fs-5" id="list-empty"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Product;
