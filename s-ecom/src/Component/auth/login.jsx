import React, { useState, useEffect } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login, clearAuthError } from "../../redux/Auth/action";
import axios from "axios";

export default function LoginUserForm({ switchTo, handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const auth = useSelector((store) => store.auth);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [forgotFlow, setForgotFlow] = useState(false);

  const [email, setEmail] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", ""]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_React_BASE_API_URL;

  const showSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setOpenSnackBar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (auth.error) {
      if (auth.error.toLowerCase().includes("invalid")) {
        showSnackbar("You entered the wrong password.");
      } else {
        showSnackbar(auth.error);
      }
    } else if (auth.user) {
      showSnackbar("Login Success");
    }
  }, [auth.user, auth.error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginLoading(true); // start loader
    // const data = new FormData(event.currentTarget); // Not using FormData here anymore for simpler state access
    const userData = {
      email: email, // use state
      // password: data.get("password"),
      password: event.target.password.value,
    };

    try {
      await dispatch(login(userData));
    } finally {
      setLoginLoading(false); // stop loader even if error
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/auth/send-reset-otp`, { email });

      showSnackbar(res.data.message);
      setOtpSent(true);
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otpInputs];
      updated[index] = value;
      setOtpInputs(updated);
      if (value && index < 4)
        document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpInputs.join("");
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/auth/verify-otp`, {
        email,
        otp,
      });
      if (res.data.success) {
        showSnackbar("OTP verified");
        setEmailVerified(true);
      }
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password`, {
        email,
        newPassword,
      });
      showSnackbar(res.data.message || "Password reset");
      setForgotFlow(false);
      setEmailVerified(false);
      setOtpSent(false);
      setOtpInputs(["", "", "", "", ""]);
      setNewPassword("");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl font-serif font-medium text-[#222426] mb-2">
          {forgotFlow ? "Reset Password" : "Welcome Back"}
        </h2>
        <p className="text-[#6B5B4A] text-sm">
          {forgotFlow
            ? "Enter your email to reset your password"
            : "Please enter your details to sign in"}
        </p>
      </div>

      {!forgotFlow ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426] placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#444648] uppercase tracking-wide"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotFlow(true)}
                  className="text-xs font-medium text-[#8A6F4F] hover:text-[#CBE600] transition-colors uppercase tracking-wide"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                required
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426] placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3.5 bg-[#CBE600] text-[#111111] font-bold uppercase tracking-wide rounded-lg hover:bg-[#DFF200] hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loginLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
              Registered Email
            </label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />
          </div>

          {!otpSent && (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 bg-[#222426] text-white font-bold uppercase tracking-wide rounded-lg hover:bg-black transition-all disabled:opacity-70"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Send OTP"
              )}
            </button>
          )}

          {otpSent && !emailVerified && (
            <div className="space-y-6">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otpInputs.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    maxLength={1}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] text-[#222426]"
                  />
                ))}
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full py-3 bg-[#CBE600] text-[#111111] font-bold uppercase tracking-wide rounded-lg hover:bg-[#DFF200] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          )}

          {emailVerified && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="w-full py-3.5 bg-[#CBE600] text-[#111111] font-bold uppercase tracking-wide rounded-lg hover:bg-[#DFF200] transition-all"
              >
                Set New Password
              </button>
            </div>
          )}

          <button
            onClick={() => setForgotFlow(false)}
            className="w-full py-2 text-sm font-semibold text-[#8A6F4F] hover:text-[#CBE600] uppercase tracking-wide transition-colors"
          >
            Back to Login
          </button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-[#E0E0E0]/60 text-center">
        <p className="text-[#6B5B4A] mb-4">Don't have an account?</p>
        <button
          onClick={() => {
            if (typeof switchTo === "function") {
              switchTo("register");
            } else {
              navigate("/register");
            }
          }}
          className="px-8 py-2 border-2 border-[#222426] text-[#222426] font-bold uppercase tracking-wide rounded-full hover:bg-[#222426] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
        >
          Create Account
        </button>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackBarMessage.toLowerCase().includes("fail") ||
            snackBarMessage.toLowerCase().includes("error") ||
            snackBarMessage.toLowerCase().includes("wrong") ||
            snackBarMessage.toLowerCase().includes("invalid")
              ? "error"
              : "success"
          }
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
