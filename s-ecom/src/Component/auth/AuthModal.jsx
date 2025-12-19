// AuthModal.jsx
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError } from "../../redux/Auth/action";
import LoginUserForm from "./login";
import RegisterUserForm from "./register";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  // local view state to avoid route-driven flicker
  // initialize from location so deep-linking works
  const initialView = location.pathname === "/register" ? "register" : "login";
  const [localView, setLocalView] = useState(initialView);

  useEffect(() => {
    // If user navigates in address bar while modal open, keep localView in sync
    setLocalView(location.pathname === "/register" ? "register" : "login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      dispatch(clearAuthError());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose?.();
      if (auth.user?.role === "ADMIN") {
        navigate("/admin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  // pass this to child forms so they switch the modal view without changing route
  const switchTo = (view) => {
    if (view === "login" || view === "register") {
      dispatch(clearAuthError());
      setLocalView(view);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Box sx={style}>
        <div className="w-[90vw] md:w-[900px] bg-[#FFF9E8] rounded-2xl shadow-2xl overflow-hidden relative border border-[#CBE600]/30 transform transition-all grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Section */}
          <div className="relative hidden md:block h-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/dsr0bbmfk/image/upload/v1764508951/second_er6626.png"
              alt="Fashion Editorial"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Overlay Text/Logo if needed */}
            <div className="absolute bottom-10 left-8 text-white z-10">
              <p className="text-xs tracking-[0.3em] font-light mb-2 opacity-90">
                EST. 2024
              </p>
              <h3 className="text-3xl font-serif font-medium leading-tight">
                Venus
                <br />
                Garments
              </h3>
            </div>
          </div>

          {/* Right Column: Form Section */}
          <div className="p-6 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col justify-center relative bg-[#FFF9E8]">
            {/* Mobile-only subtle header deco */}
            <div className="md:hidden absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#CBE600] to-[#DFF200]"></div>

            {localView === "login" ? (
              <LoginUserForm switchTo={switchTo} handleClose={handleClose} />
            ) : (
              <RegisterUserForm switchTo={switchTo} handleClose={handleClose} />
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
