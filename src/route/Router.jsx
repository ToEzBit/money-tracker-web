import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import HomePage from "../page/HomePage";
import ReportPage from "../page/ReportPage";
import Navbar from "../components/layout/navbar/Navbar";
import FetchMe from "../query/FetchMe";
function Router() {
  const { data } = FetchMe();
  return (
    <>
      <Routes>
        {true ? (
          <>
            <Route path="/" element={<Navbar />}>
              <Route path="" element={<HomePage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Router;
