import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/login";
import Home from "./component/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
