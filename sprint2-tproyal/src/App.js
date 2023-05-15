import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
