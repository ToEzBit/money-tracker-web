import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import HomePage from "../page/HomePage";
import Navbar from "../components/layout/navbar/Navbar";
import fetchMe from "../query/fetchMe";
function Router() {
  const { data } = fetchMe();
  return (
    <>
      <Routes>
        {data?.user ? (
          <>
            <Route path="/" element={<Navbar />}>
              <Route path="" element={<HomePage />} />
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
