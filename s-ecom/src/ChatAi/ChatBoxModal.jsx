import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
  Avatar,
  Typography,
  Fade,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessage } from "../redux/Chat/Action";

const ChatBoxModal = ({ open, handleClose }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);

  // Initial welcome message
  useEffect(() => {
    if (open && messages?.length === 0) {
      dispatch({
        type: "CHAT_SUCCESS",
        payload: {
          sender: "bot",
          text: "Hi! 👋 I can help you with product details, order status, super coins, and payments. Try asking about 'order status' or 'price of cotton kurti'."
        }
      });
    }
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(sendChatMessage(input));
    setInput("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:50000
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: {
              xs: "100%",
              sm: "90%",
              md: 480,
              lg: 520,
            },
            height: {
              xs: "100%",
              sm: "90vh",
              md: 600,
            },
            maxHeight: {
              xs: "100%",
              sm: "90vh",
              md: 700,
            },
            bgcolor: "background.paper",
            boxShadow: {
              xs: 0,
              sm: "0 8px 32px rgba(0,0,0,0.12)",
            },
            borderRadius: {
              xs: 0,
              sm: 3,
            },
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            m: {
              xs: 0,
              sm: 2,
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              p: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                }}
              >
                <SupportAgentIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Venus Garments
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.9,
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  }}
                >
                  Customer Support
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleClose}
              sx={{
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Body */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: { xs: 2, sm: 2.5 },
              bgcolor: "#f8f9fa",
              backgroundImage: "radial-gradient(circle at 20px 20px, rgba(102, 126, 234, 0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              scrollbarWidth: "thin",
              scrollbarColor: "#ccc transparent",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                borderRadius: "10px",
              },
            }}
          >
            {messages?.map((msg, i) => (
              <Slide
                key={i}
                direction={msg.sender === "user" ? "left" : "right"}
                in={true}
                timeout={300}
              >
                <Box
                  display="flex"
                  justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
                  alignItems="flex-end"
                  gap={1}
                  mb={2}
                >
                  {msg.sender !== "user" && (
                    <Avatar
                      sx={{
                        bgcolor: "#667eea",
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                      }}
                    >
                      <SupportAgentIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "white",
                      color: msg.sender === "user" ? "white" : "#333",
                      padding: { xs: "10px 14px", sm: "12px 16px" },
                      borderRadius:
                        msg.sender === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                      maxWidth: { xs: "75%", sm: "70%" },
                      boxShadow:
                        msg.sender === "user"
                          ? "0 2px 8px rgba(102, 126, 234, 0.3)"
                          : "0 2px 8px rgba(0,0,0,0.08)",
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </Box>
                  {msg.sender === "user" && (
                    <Avatar
                      sx={{
                        bgcolor: "#764ba2",
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                      }}
                    >
                      <PersonIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </Avatar>
                  )}
                </Box>
              </Slide>
            ))}

            {/* Typing animation */}
            {loading && (
              <Box display="flex" alignItems="flex-end" gap={1} mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "#667eea",
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                  }}
                >
                  <SupportAgentIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                </Avatar>
                <Box
                  sx={{
                    background: "white",
                    padding: { xs: "10px 14px", sm: "12px 16px" },
                    borderRadius: "18px 18px 18px 4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    display: "flex",
                    gap: 0.5,
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#667eea",
                      animation: "bounce 1.4s infinite ease-in-out both",
                      animationDelay: "0s",
                      "@keyframes bounce": {
                        "0%, 80%, 100%": { transform: "scale(0)" },
                        "40%": { transform: "scale(1)" },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#667eea",
                      animation: "bounce 1.4s infinite ease-in-out both",
                      animationDelay: "0.2s",
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#667eea",
                      animation: "bounce 1.4s infinite ease-in-out both",
                      animationDelay: "0.4s",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              bgcolor: "white",
              borderTop: "1px solid #e0e0e0",
              boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box display="flex" gap={1} alignItems="flex-end">
              <TextField
                fullWidth
                multiline
                maxRows={3}
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f8f9fa",
                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!input.trim()}
                sx={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "#e0e0e0",
                  color: "white",
                  width: { xs: 44, sm: 48 },
                  height: { xs: 44, sm: 48 },
                  "&:hover": {
                    background: input.trim()
                      ? "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)"
                      : "#e0e0e0",
                  },
                  "&:disabled": {
                    color: "#999",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <SendIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChatBoxModal;