// src/them/customeThem.jsx
import React from "react";
import { createTheme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

/* -------------------------------
   THEMES (light by default)
   ------------------------------- */
const customTheme = createTheme({
  palette: {
    mode: "light", // default to light for white background dashboards
    primary: { main: "#9155FD" },
    secondary: { main: "#f48fb1" },
    white: { main: "#ffffff" },
    orange: { main: "#ffdb0f" },
    background: { default: "#f7f7fb", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6B7280" } // darker text for white bg
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9155FD" },
    secondary: { main: "#f48fb1" },
    background: { default: "#0b1020", paper: "#0b1020" },
    text: { primary: "#e6e6e6", secondary: "#9ca3af" }
  },
  shape: { borderRadius: 12 }
});

// backward-compatible name: a light theme you can explicitly import
const customerTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#9155FD" },
    secondary: { main: "#f48fb1" },
    white: { main: "#fff" },
    orange: { main: "#ffdb0f" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6B7280" }
  },
  shape: { borderRadius: 12 }
});

/* -----------------------------------------------------
   CardStatsVertical component (theme-aware)
   - uses theme.palette for colors so it looks good on white bg
   ----------------------------------------------------- */
export const CardStatsVertical = ({
  stats = "",
  title = "",
  subtitle = "",
  icon = null,
  color = "primary",
  trend = "neutral", // 'positive' | 'negative' | 'neutral'
  trendNumber = ""
}) => {
  const theme = useTheme();

  // trend color mapping using current theme
  const trendColor =
    trend === "positive"
      ? theme.palette.success?.main || "#16a34a"
      : trend === "negative"
      ? theme.palette.error?.main || "#dc2626"
      : theme.palette.text.secondary;

  // avatar background — use theme palette color key if available
  const avatarBg = (theme.palette[color] && theme.palette[color].main) || theme.palette.primary.main;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        p: 2,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.mode === "light" ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)"}`
      }}
    >
      <Avatar
        variant="rounded"
        sx={{
          mr: 2,
          width: 44,
          height: 44,
          bgcolor: avatarBg,
          boxShadow: 2,
          color: theme.palette.common.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon}
      </Avatar>

      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          {stats}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.25 }}>
          {title}
        </Typography>

        <Box sx={{ mt: 0.6, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" sx={{ color: trendColor, fontWeight: 700 }}>
            {trendNumber}
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* -----------------------
   Exports
   ----------------------- */
export { customTheme, darkTheme, customerTheme };
export default customTheme;
