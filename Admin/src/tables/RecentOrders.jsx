import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate();

  // Helper to safely get first product info
  const getFirstProduct = (order) => {
    const first = order?.orderItems?.[0];
    if (!first) return {};
    return first.product || {};
  };

  const handleRowClick = (orderId) => {
    if (!orderId) return;
    // navigate to order details page (adjust route if different)
    navigate(`/orders/${orderId}`);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
      aria-label="Recent orders"
    >
      <CardHeader
        title="Recent Orders"
        sx={{ pt: 2, alignItems: "center", "& .MuiCardHeader-action": { mt: 0.6 } }}
        action={
          <Typography
            onClick={() => navigate("/orders")}
            variant="caption"
            sx={{ color: "#6A1B9A", cursor: "pointer", paddingRight: ".8rem", fontWeight: 600 }}
          >
            View All →
          </Typography>
        }
        titleTypographyProps={{
          variant: "h6",
          sx: { lineHeight: "1.6 !important", letterSpacing: "0.15px !important", fontWeight: 700 },
        }}
      />

      <TableContainer>
        <Table sx={{ minWidth: 720 }} aria-label="recent orders table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.slice(0, 10).map((order, index) => {
                const item = getFirstProduct(order);
                const imageSrc = (item?.imageUrl && item.imageUrl[0]) || item?.image || "/default-product.png";
                const title = item?.title || order?.orderItems?.[0]?.name || "Untitled product";
                const price = order?.totalDiscountedPrice ?? order?.totalPrice ?? 0;
                const orderId = order?._id || order?.orderId || `ORD-${index + 1}`;
                const status = (order?.orderStatus || "PENDING").toUpperCase();

                // choose chip color
                const chipColor =
                  status === "DELIVERED" ? "success" : status === "CANCELLED" ? "error" : "warning";

                return (
                  <TableRow
                    hover
                    key={orderId}
                    sx={{ cursor: orderId ? "pointer" : "default" }}
                    onClick={() => handleRowClick(orderId)}
                  >
                    <TableCell>
                      <Avatar alt={title} src={imageSrc} sx={{ width: 46, height: 46 }} />
                    </TableCell>

                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.75)} !important`, maxWidth: 280 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }} noWrap>
                          {title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {item?.brand || ""}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>₹{price.toLocaleString()}</TableCell>

                    <TableCell sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}>{orderId}</TableCell>

                    <TableCell>
                      <Chip
                        label={status}
                        size="small"
                        color={chipColor}
                        sx={{ color: "#fff", fontWeight: 700 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No recent orders.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
