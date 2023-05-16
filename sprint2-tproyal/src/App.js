import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/login";
import Home from "./component/Home/Home";
import Detail from "./component/Detail/Detail";
import ShoppingCart from "./component/ShoppingCart/ShoppingCart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/shopping" element={<ShoppingCart/>} />

      </Routes>
    </>
  );
}

export default App;
