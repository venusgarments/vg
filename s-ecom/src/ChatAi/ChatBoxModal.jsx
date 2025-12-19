import React, { useEffect, useState, useRef } from "react";
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
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessage } from "../redux/Chat/Action";
import { useNavigate } from "react-router-dom";
import TypingDots from "./TypingDots";

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
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Replaced loginAlert with showLoginPrompt

  // Redux
  const { messages, loading, error } = useSelector((state) => state.chat); // Added error
  const auth = useSelector((state) => state.auth);

  /* ================== AUTH CHECK ================== */
  useEffect(() => {
    if (!open) return;

    // Check if user is already in Redux OR if we have a valid token in storage
    const token = localStorage.getItem("jwt");
    const hasValidToken = token && !isJwtExpired(token);
    const isLoggedIn = auth.user || hasValidToken;

    setShowLoginPrompt(!isLoggedIn); // Set showLoginPrompt based on login status
  }, [open, auth.user]); // Listen to auth.user

  /* ================== WELCOME MESSAGE ================== */
  useEffect(() => {
    if (open && (!messages || messages.length === 0) && !showLoginPrompt) {
      // Added !showLoginPrompt
      // Only dispatch if we actually have a valid user
      const token = localStorage.getItem("jwt");
      if (auth.user || (token && !isJwtExpired(token))) {
        dispatch({
          type: "CHAT_SUCCESS",
          payload: {
            sender: "bot",
            text: "Hi! 👋 I can help you with product details, order status, super coins, and payments.",
          },
        });
      }
    }
  }, [open, messages, dispatch, auth.user, showLoginPrompt]); // Added showLoginPrompt to dependencies

  /* ================== AUTO SCROLL ================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, showLoginPrompt, error]); // Added showLoginPrompt, error to dependencies

  /* ================== SEND MESSAGE ================== */
  const handleSend = () => {
    if (showLoginPrompt) {
      // Logic to redirect to login would go here, maybe open login modal
      // For now, just ensure we don't send.
      return;
    }
    if (!input.trim()) return;
    dispatch(sendChatMessage(input));
    setInput("");
  };

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/login"); // Or however your app handles login opening
    // If the login is a modal on Home, navigate("/") might be needed + some state
    // But looking at App.jsx, /login routes to Home.
  };

  return (
    <>
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
            {/* Header - REVERTED TO NEON GREEN */}
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
                  <Typography variant="caption">Customer Support</Typography>
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
                display: "flex",
                flexDirection: "column",
              }}
            >
              {showLoginPrompt ? (
                <Box
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  p={3}
                  textAlign="center"
                >
                  <SupportAgentIcon
                    sx={{ fontSize: 60, color: "#ccc", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Login Required
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Please login to chat with our support assistant and track
                    your orders.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleLoginRedirect}
                    sx={{
                      bgcolor: "#c8ff00",
                      color: "#000",
                      "&:hover": { bgcolor: "#b8ef00" },
                    }}
                  >
                    Go to Login
                  </Button>
                </Box>
              ) : (
                <>
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
                            bgcolor: msg.sender === "user" ? "#c8ff00" : "#fff",
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
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mt={1}
                      ml={1}
                    >
                      <Typography
                        variant="caption"
                        sx={{ fontStyle: "italic", color: "#666" }}
                      >
                        Typing
                        <TypingDots />
                      </Typography>
                    </Box>
                  )}

                  {error && (
                    <Box
                      mt={2}
                      p={1}
                      bgcolor="#ffebee"
                      borderRadius={1}
                      border="1px solid #ffcdd2"
                    >
                      <Typography variant="caption" color="error">
                        Unable to connect: {error}. Please try refreshing.
                      </Typography>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </Box>

            {/* Input */}
            <Box p={2} borderTop="1px solid #eee">
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  placeholder={
                    showLoginPrompt
                      ? "Please login to chat..."
                      : "Type your message..."
                  }
                  value={input}
                  disabled={showLoginPrompt}
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
                  disabled={!input.trim() || showLoginPrompt}
                  sx={{
                    bgcolor: "#c8ff00",
                    "&:hover": { bgcolor: "#b8ef00" },
                    "&:disabled": { bgcolor: "#ddd" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ChatBoxModal;
