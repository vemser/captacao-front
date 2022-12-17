import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";

export const Router = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
