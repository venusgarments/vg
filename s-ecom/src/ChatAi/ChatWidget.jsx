// components/ChatWidget.js
import React, { useState } from "react";
import { Fab, Snackbar, Alert } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBoxModal from "./ChatBoxModal";
import { useSelector } from "react-redux";

/* ================== JWT HELPER ================== */
const isJwtExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Robust Login Check
  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    const token = localStorage.getItem("jwt");
    const hasValidToken = token && !isJwtExpired(token);
    const isLoggedIn = auth.user || hasValidToken;

    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 20 }}
      >
        <ChatIcon />
      </Fab>

      {/* Only render modal if open to prevent any background crashes/init issues */}
      {open && <ChatBoxModal open={open} handleClose={() => setOpen(false)} />}

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setShowToast(false)}
          sx={{ width: "100%" }}
        >
          Please login to access chat support
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChatWidget;
