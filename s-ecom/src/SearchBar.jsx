import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Box,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "./redux/product/action";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [typingText, setTypingText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  /* ---------------- Cursor Blink ---------------- */
const words = [
  "Formal Pants",
  "Cotton Pants",
  "Linen Pants",
  "Cargo",
  "Track Pants",
  "Jeans",
  "Formal Shirts",
  "Satin Shirts",
  "Hidden Button Shirts",
  "Tank Tops",
  "Peplum Tops",
  "Crop Tops",
];

const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, 2500); // change word every 2.5s
  return () => clearInterval(interval);
}, []);


  /* ---------------- Typing Animation ---------------- */
  useEffect(() => {
    if (isUserTyping) return;

    const currentWord = words[wordIndex];
    const speed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, typingText.length - 1)
        : currentWord.substring(0, typingText.length + 1);

      setTypingText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 900);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, wordIndex, isUserTyping]);

  /* ---------------- Input Change ---------------- */
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setIsUserTyping(value !== "");
  };

  /* ---------------- Clear ---------------- */
  const handleClear = () => {
    setUserInput("");
    setIsUserTyping(false);
  };

  /* ---------------- Search on Enter ---------------- */
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const query = userInput.trim();
      setLoading(true);

      try {
        const res = await dispatch(searchProducts({ query }));
        setLoading(false);

        navigate(`/search?query=${encodeURIComponent(query)}&page=1`);

        if (res?.products?.length > 0) {
          setSnackbarSeverity("success");
          setSnackbarMessage(`Showing results for "${query}"`);
        } else {
          setSnackbarSeverity("warning");
          setSnackbarMessage("No products found.");
        }
      } catch {
        setLoading(false);
        setSnackbarSeverity("error");
        setSnackbarMessage("Search failed. Please try again.");
      }

      setSnackbarOpen(true);
    }
  };

  return (
    <>
<Box
  sx={{
    position: "relative",
    marginTop: "5px",
    width: "100%",
    borderRadius: "14px",
    backgroundColor: "transparent",
  }}
>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    value={userInput}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    disabled={loading}
    placeholder=""
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: "#2d2d2d", fontSize: 22 }} />
        </InputAdornment>
      ),
      endAdornment: userInput && (
        <InputAdornment position="end">
          <IconButton onClick={handleClear}>
            <CloseIcon sx={{ color: "#6b7280", fontSize: 18 }} />
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      backgroundColor: "transparent",
      borderRadius: "14px",

      "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: 500,

        // Default white border
        "& fieldset": {
          borderColor: "white",
          borderWidth: "1.8px",
        },

        // Hover stays white
        "&:hover fieldset": {
          borderColor: "white",
        },

        // Focus white + slightly thicker
        "&.Mui-focused fieldset": {
          borderColor: "white",
          borderWidth: "2.5px",
        },

        boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
      },

      "& .MuiInputBase-input": {
        padding: "12px 10px",
        color: "black",
      },
    }}
  />

{!isUserTyping && (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "46px",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      fontSize: "14px",
      display: "flex",
      gap: "6px",
      alignItems: "center",
      overflow: "hidden",
      height: "20px",
      width: "fit-content",
    }}
  >
    <span style={{ color: "black" }}>Search here</span>

    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          color: "#5A8F00",
          fontWeight: 700,
          marginLeft: 6
        }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>


  </Box>
)}


</Box>



      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            borderRadius: "10px",
            fontSize: "14px",
            backgroundColor:
              snackbarSeverity === "success"
                ? "#8A6F4F"
                : snackbarSeverity === "warning"
                ? "#d97706"
                : "#b91c1c",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Loader */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress
            size={55}
            thickness={4}
            sx={{ color: "#DFF200" }}
          />
        </Box>
      )}
    </>
  );
};

export default SearchBar;
