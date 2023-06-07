import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SimpleSlider from "../util/SimpleSlider";
import productService from "../../service/productService";
import cartDetailService from "../../service/cartDetailService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const param = useParams();

  const handleChangeQuantity = (e) => {
    setQuantity(+e.target.value);
  };

  const handleAddCartDetail = async (productId, productPrice) => {
    try {
      if (quantity === 0) {
        toast.warn("Hãy chọn số lượng sản phẩm");
      } else {
        await cartDetailService.save({
          quantity: quantity,
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsResponse = await productService.findAll();
        setProducts(productsResponse.data.content);
      } catch (error) {
        console.warn(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await productService.findById(param.id);
      setProduct(productResponse.data);
    };
    getProduct();
  }, [param.id]);

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="wrapper_inner_banner mb-5">
        <img
          src=""
          alt=""
          width={"100%"}
        />
      </div>
      <div className="site mb-5 mt-5" id="page">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-7 col-xs-12 pull-left p-0">
              <div className="row m-0">
                <div className="col-7 p-0">
                  <SimpleSlider imgList={product.productImgDTOS} />
                </div>
                <div className="col-5 p-0">
                  <h1 style={{ fontSize: "24px", color: "#12ac4c" }} className="mt-3 mb-3 fs-3">
                    {product.name}
                  </h1>
                  <p className="price fs-5">
                    Giá sản phẩm:  
                    <b className="ms-2" style={{color: "red"}} >
                        {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </b>
                  </p>
                  <p className="price fs-5">
                    Kích thước: 
                    <b className="ms-2">
                    {product.size}
                    </b>
                  </p>
                  <p className="price fs-5">
                    Vật liệu: 
                    <b className="ms-2">
                    {product.material}
                    </b>
                  </p>
                  <div className="description fs-6" style={{ textAlign: "justify" }}>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                    <div className="d-flex align-items-center mb-1 gap-2 mt-2">
                      <input
                        type="number"
                        style={{ width: 50 }}
                        min={0}
                        value={quantity}
                        onChange={(e) => handleChangeQuantity(e)}
                      />
                      <button
                        className="btn btn-success rounded-pill"
                        onClick={() =>
                          handleAddCartDetail(product.id, product.price)
                        }
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                    <div className="mt-2">
                    {product.quantity <= 10 ? (
                        <div>(Còn {product.quantity} sản phẩm)</div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <p className="m-0 mt-2">
                      <b>Thương hiệu:</b> TP Royal
                    </p>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-3 p-0">
              <h1 style={{ fontSize: "24px" }} className="text-center mt-3 mb-2">
                SẢN PHẨM TƯƠNG TỰ
              </h1>

              <div className="holder d-flex justify-content-center align-items-center flex-column">
                {products.map((product, index) => (
                  <div className="product-data text-center mb-3" key={index}>
                    <div className="product-image">
                      <img
                        src={product.productImgDTOS[0].url}
                        alt=""
                        width={100}
                        height={100}
                        style={{height: "200px", width: "200px"}}
                      />
                    </div>
                    <div className="action-button">
                      <span className="view_details_button">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="button-detail"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                      </span>

                      <span className="product_type_external">
                        <button
                          className="button-cart"
                          style={{ border: "none", background: "none" }}
                        >
                          <i className="bi bi-cart"></i>
                        </button>
                      </span>
                    </div>
                    <div className="data mt-2">
                      <h2
                        style={{
                          fontSize: "16px",
                          color: "#12ac4c",
                          lineHeight: "22px",
                        }}
                      >
                        {product.name}
                      </h2>
                      <span>
                        Giá: 
                        <b className="ms-2" style={{color: "red"}} >
                          {product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </b>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductDetail;