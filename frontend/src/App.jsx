import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import axios from "axios";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  clearError,
  setError,
  setUser,
  logout,
  setLoading,
} from "./redux/slices/authSlice";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken || user) return;
    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );
        dispatch(setUser({ user: res.data, token: storedToken }));
      } catch (error) {
        console.error("getMe failed", error);
        dispatch(logout());
        dispatch(
          setError(
            error?.response?.data?.message ||
              "session expired.Please login again",
          ),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUser();
  }, [dispatch, token, user]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}/
        <Route path="/" element={<Homepage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
