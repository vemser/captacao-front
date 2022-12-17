import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Subscription } from "../pages/Subscription";

export const Router = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </>
  );
};
