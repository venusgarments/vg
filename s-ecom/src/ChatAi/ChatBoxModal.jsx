import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Fade,
  Slide,
  Snackbar,
  Button,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessage } from "../redux/Chat/Action";
import { useNavigate } from "react-router-dom";

/* ================== JWT HELPER ================== */
const isJwtExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ChatBoxModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loginAlert, setLoginAlert] = useState(false);

  const { messages, loading } = useSelector((state) => state.chat);

  /* ================== AUTH CHECK ================== */
  useEffect(() => {
    if (!open) return;

    const jwt = localStorage.getItem("jwt");

    if (!jwt || jwt === "undefined" || isJwtExpired(jwt)) {
      setLoginAlert(true);
      handleClose();

      // setTimeout(() => {
      //   navigate("/login");
      //   window.location.reload();
      // }, 1500);
    }
  }, [open, handleClose, navigate]);

  /* ================== WELCOME MESSAGE ================== */
  useEffect(() => {
    if (open && messages?.length === 0) {
      dispatch({
        type: "CHAT_SUCCESS",
        payload: {
          sender: "bot",
          text:
            "Hi! 👋 I can help you with product details, order status, super coins, and payments.",
        },
      });
    }
  }, [open, messages, dispatch]);

  /* ================== SEND MESSAGE ================== */
  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(sendChatMessage(input));
    setInput("");
  };

  return (
    <>
      {/* ================== CHAT MODAL ================== */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50000,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: { xs: "100%", sm: 480 },
              height: { xs: "100%", sm: 600 },
              bgcolor: "background.paper",
              borderRadius: { xs: 0, sm: 3 },
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "#c8ff00",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ bgcolor: "#00000022" }}>
                  <SupportAgentIcon sx={{ color: "#000" }} />
                </Avatar>
                <Box>
                  <Typography fontWeight={600}>Venus Garments</Typography>
                  <Typography variant="caption">
                    Customer Support
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Chat Body */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                bgcolor: "#f8f9fa",
              }}
            >
              {messages?.map((msg, i) => (
                <Slide key={i} direction="up" in timeout={300}>
                  <Box
                    display="flex"
                    justifyContent={
                      msg.sender === "user" ? "flex-end" : "flex-start"
                    }
                    mb={2}
                  >
                    {msg.sender !== "user" && (
                      <Avatar sx={{ bgcolor: "#c8ff00", mr: 1 }}>
                        <SupportAgentIcon sx={{ color: "#000" }} />
                      </Avatar>
                    )}

                    <Box
                      sx={{
                        bgcolor:
                          msg.sender === "user" ? "#c8ff00" : "#fff",
                        color: "#000",
                        p: 1.5,
                        borderRadius: 2,
                        maxWidth: "70%",
                        boxShadow: 1,
                      }}
                    >
                      {msg.text}
                    </Box>

                    {msg.sender === "user" && (
                      <Avatar sx={{ bgcolor: "#a8d900", ml: 1 }}>
                        <PersonIcon sx={{ color: "#000" }} />
                      </Avatar>
                    )}
                  </Box>
                </Slide>
              ))}

              {loading && (
                <Typography variant="caption">Typing...</Typography>
              )}
            </Box>

            {/* Input */}
            <Box p={2} borderTop="1px solid #eee">
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={!input.trim()}
                  sx={{
                    bgcolor: "#c8ff00",
                    "&:hover": { bgcolor: "#b8ef00" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* ================== LOGIN ALERT ================== */}
      <Snackbar
        open={loginAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" variant="filled">
          Please login to chat with support
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChatBoxModal;
