import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/login";
import Home from "./component/Home/Home";
import ShoppingCarts from "./component/ShoppingCart/ShoppingCarts";
import Product from "./component/List/Product";
import ProductDetail from "./component/Detail/ProductDetail";
import ShoppingCart from "./component/Cart/ShoppingCart";
import Register from "./component/Register/Register";
import PaymentResult from "./component/Payment/PaymentResult";
import CartDetails from "./component/History/PurchasedCartDetails";
import UserProfile from "./component/Profile/UserProfile";
import OutletWrapper from "./component/Router/OutletWrapper";

function App() {
  return (
    <>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/payment-info" element={<PaymentResult />} />
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<OutletWrapper/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/shopping" element={<ShoppingCarts/>} />
        <Route path="/list" element={<Product/>} />
        <Route path="/product-detail/:id" element={<ProductDetail />} /> 
        <Route path="/cart" element={<ShoppingCart />} />  
        <Route path="/cart-detail" element={<CartDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        </Route>
           </Routes>
    </>
  );
}

export default App;
