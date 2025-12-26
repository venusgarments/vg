import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/Auth/action";
import {
  Button,
  Avatar,
  Paper,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  ShoppingBag as OrderIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFFDF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header - Lighter Theme */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid #DFF200", // Yellow border
            mb: 4,
            bgcolor: "white", // White background instead of black
            position: "relative",
          }}
        >
          {/* Top decorative stripe */}
          <div className="h-24 bg-[#DFF200] w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6 relative z-10">
            <Avatar
              sx={{
                width: 128,
                height: 128,
                bgcolor: "#FFFFFF", // White background
                color: "#111111",
                fontSize: "3rem",
                fontWeight: "800",
                border: "4px solid #DFF200", // Yellow border
                boxShadow: "0 8px 24px rgba(223, 242, 0, 0.2)",
              }}
            >
              {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
            </Avatar>

            <div className="flex-1 pb-2 text-center md:text-left">
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 800, color: "#111111", mb: 0.5 }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: { xs: "center", md: "start" },
                }}
              >
                <EmailIcon sx={{ fontSize: 18, color: "#CBE600" }} />{" "}
                {user.email}
              </Typography>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px] mb-2">
              <Button
                variant="contained"
                startIcon={<OrderIcon />}
                onClick={() => navigate("/account/order")}
                sx={{
                  bgcolor: "#DFF200", // Theme Yellow
                  color: "#111111",
                  fontWeight: "bold",
                  py: 1.2,
                  px: 3,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(223, 242, 0, 0.3)",
                  "&:hover": {
                    bgcolor: "#CBE600",
                    boxShadow: "0 6px 16px rgba(223, 242, 0, 0.4)",
                  },
                }}
              >
                My Orders
              </Button>
            </div>
          </div>
        </Paper>

        <Grid container spacing={4}>
          {/* Details Column */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid #e5e7eb",
                height: "100%",
                bgcolor: "white",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#DFF200]/20 rounded-lg">
                    <PersonIcon sx={{ color: "#bdae0d", fontSize: 24 }} />
                  </div>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#111111" }}
                  >
                    Personal Information
                  </Typography>
                </div>
              </div>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className="p-3">
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Full Name
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "#111111" }}
                    >
                      {user.firstName} {user.lastName}
                    </Typography>
                  </div>
                  <Divider sx={{ display: { xs: "block", sm: "none" } }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className="p-3">
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Email Address
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "#111111" }}
                    >
                      {user.email}
                    </Typography>
                  </div>
                  <Divider sx={{ display: { xs: "block", sm: "none" } }} />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ display: { xs: "none", sm: "block" } }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className="p-3">
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Account Role
                    </Typography>
                    <div className="inline-block px-3 py-1 bg-[#FFFDF6] border border-[#DFF200] rounded-md text-sm font-bold text-[#111111]">
                      {user.role || "Customer"}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="p-3">
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      User ID
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#666",
                        fontFamily: "monospace",
                      }}
                    >
                      {user._id}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Actions Column */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid #e5e7eb",
                height: "100%",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="mb-6">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1, color: "#111111" }}
                >
                  Account Actions
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Control your profile session.
                </Typography>
              </div>

              <Box sx={{ mt: "auto" }}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: "bold",
                    borderWidth: "2px",
                    textTransform: "none",
                    fontSize: "1rem",
                    borderColor: "#fee2e2",
                    color: "#ef4444",
                    bgcolor: "#fff1f2",
                    "&:hover": {
                      borderWidth: "2px",
                      bgcolor: "#fee2e2",
                      borderColor: "#fecaca",
                    },
                  }}
                >
                  Log Out
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
