import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../redux/Auth/action";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function RegisterUserForm({ switchTo }) {
  const baseUrl = import.meta.env.VITE_React_BASE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setSnackBarOpen(true);
  };
  const handleCloseSnackbar = () => setSnackBarOpen(false);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSendOtp = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.startsWith("a@")) {
      return handleSnackbar("Please enter a valid and acceptable email.");
    }

    try {
      setOtpLoading(true);
      const res = await axios.post(`${baseUrl}/auth/send-otp`, { email });
      // console.log("res data....", res);
      handleSnackbar(res.data.message || "OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      // console.error("❌ OTP Send Error:", err?.response || err); // <-- Log full error
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to send OTP.";

      // Show special message if user already exists
      if (errorMsg.toLowerCase().includes("user already exists")) {
        handleSnackbar("User already registered. Please login.");
      } else {
        handleSnackbar(errorMsg);
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpInputs.join("");
    if (enteredOtp.length !== 5) {
      return handleSnackbar("Please enter a valid 5-digit OTP.");
    }

    try {
      setVerifyingOtp(true);
      const res = await axios.post(`${baseUrl}/auth/verify-otp`, {
        email,
        otp: enteredOtp,
      });

      if (res.data.success === true) {
        // console.log("✅ Setting Email Verified to true");
        setEmailVerified(true); // 👈 This should now work
        handleSnackbar("Email verified successfully!");
      } else {
        handleSnackbar(res.data.message || "OTP verification failed.");
      }
    } catch (err) {
      handleSnackbar(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  useEffect(() => {
    // console.log("Email verification status updated:", emailVerified);
  }, [emailVerified]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpInputs];
      newOtp[index] = value;
      setOtpInputs(newOtp);

      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, lowercase, number & special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      setRegisterLoading(true);
      await dispatch(register({ ...formData, email }));
    } finally {
      setRegisterLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user) handleSnackbar("Register Success");
    if (auth.error) handleSnackbar(auth.error);
  }, [auth.user, auth.error]);

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl font-serif font-medium text-[#222426] mb-2">
          Create Account
        </h2>
        <p className="text-[#6B5B4A] text-sm">
          Join us for an exclusive fashion experience
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
            Email Address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => !emailVerified && setEmail(e.target.value)}
            disabled={emailVerified}
            className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426] placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="Enter your email"
          />
        </div>

        {!otpSent && !emailVerified && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpLoading}
            className="w-full py-3 bg-[#222426] text-white font-bold uppercase tracking-wide rounded-lg hover:bg-black transition-all disabled:opacity-70 flex justify-center"
          >
            {otpLoading ? (
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
              type="button"
              onClick={handleVerifyOtp}
              disabled={verifyingOtp}
              className="w-full py-3 bg-[#CBE600] text-[#111111] font-bold uppercase tracking-wide rounded-lg hover:bg-[#DFF200] transition-all disabled:opacity-70 flex justify-center"
            >
              {verifyingOtp ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {emailVerified && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#444648] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full px-4 py-3 bg-white border ${
                  passwordError ? "border-red-500" : "border-[#E0E0E0]"
                } rounded-lg focus:outline-none focus:border-[#CBE600] focus:ring-1 focus:ring-[#CBE600] transition-all text-[#222426]`}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!emailVerified || registerLoading}
              className="w-full py-3.5 bg-[#CBE600] text-[#111111] font-bold uppercase tracking-wide rounded-lg hover:bg-[#DFF200] hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {registerLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 pt-6 border-t border-[#E0E0E0]/60 text-center">
        <p className="text-[#6B5B4A] mb-4">Already have an account?</p>
        <button
          onClick={() => {
            if (typeof switchTo === "function") {
              switchTo("login");
            } else {
              navigate("/login");
            }
          }}
          className="px-8 py-2 border-2 border-[#222426] text-[#222426] font-bold uppercase tracking-wide rounded-full hover:bg-[#222426] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
        >
          Sign In
        </button>
      </div>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackBarMessage.toLowerCase().includes("fail") ||
            snackBarMessage.toLowerCase().includes("error") ||
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
