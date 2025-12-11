import React from "react";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem, getCart } from "../redux/Cart/Action";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const baseUrl = import.meta.env.VITE_React_BASE_API_URL;

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?._id, jwt };
    dispatch(removeCartItem(data));
  };

  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
      jwt,
    };
    console.log("update data ", data);
    dispatch(updateCartItem(data)).then(() => {
      dispatch(getCart(jwt));
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:border-[#CBE600] transition-all duration-300">
      <div className="p-3 sm:p-5">
        {/* Main Row - Image + Details */}
        <div className="flex gap-3 sm:gap-5">
          {/* Product Image */}
          <div className="relative shrink-0 w-24 h-28 sm:w-32 sm:h-36 bg-[#FFFDF6] rounded-xl overflow-hidden border-2 border-[#DFF200] group">
            <img
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              src={item?.product?.imageUrl?.[0]}
              alt={item?.product?.title || "Product"}
            />
            {item?.product?.discountPersent > 0 && (
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-[#DFF200] text-[#111111] text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-md border border-[#CBE600]">
                {item?.product?.discountPersent}% OFF
              </div>
            )}
          </div>

          {/* Product Details - Title, Size, Brand only */}
          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5 sm:space-y-2">
            {/* Title + Delete */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-[#111111] text-base sm:text-lg lg:text-xl line-clamp-2 leading-snug">
                {item?.product?.title}
              </h3>
              {showButton && (
                <IconButton
                  onClick={handleRemoveItemFromCart}
                  size="small"
                  sx={{
                    color: "#111111",
                    padding: "4px",
                    "&:hover": {
                      bgcolor: "#fee",
                      color: "#dc2626",
                    },
                  }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                </IconButton>
              )}
            </div>

            {/* Size */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium text-[#111111]">Size:</span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#DFF200] text-[#111111] font-bold rounded-md sm:rounded-lg text-xs sm:text-sm uppercase border border-[#CBE600]">
                {item?.size}
              </span>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium text-[#111111]">Brand:</span>
              <span className="font-bold text-[#111111]">
                {item?.product?.brand}
              </span>
            </div>

            {/* View Details */}
            <button
              onClick={() => navigate(`/product/${item?.product?._id}`)}
              className="text-sm text-[#8A6F4F] font-medium hover:underline self-start"
            >
              View Details →
            </button>
          </div>
        </div>

        {/* Footer - Quantity + Price */}
        {showButton && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            {/* Quantity Controls */}
            <div className="inline-flex items-center border-2 border-[#DFF200] rounded-xl overflow-hidden bg-white">
              <IconButton
                onClick={() => handleUpdateCartItem(-1)}
                disabled={item?.quantity <= 1}
                size="small"
                sx={{
                  borderRadius: 0,
                  color: "#111111",
                  px: 1.5,
                  py: 0.75,
                  "&:hover": { bgcolor: "#DFF200" },
                  "&.Mui-disabled": { opacity: 0.3, color: "#111111" },
                }}
              >
                <RemoveIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <span className="px-4 py-1 font-bold text-[#111111] text-sm min-w-10 text-center border-x-2 border-[#DFF200]">
                {item?.quantity}
              </span>

              <IconButton
                onClick={() => handleUpdateCartItem(1)}
                size="small"
                sx={{
                  borderRadius: 0,
                  color: "#111111",
                  px: 1.5,
                  py: 0.75,
                  "&:hover": { bgcolor: "#DFF200" },
                }}
              >
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl font-bold text-[#111111]">
                ₹{item?.product?.discountedPrice * item?.quantity}
              </span>
              {item?.product?.price !== item?.product?.discountedPrice && (
                <span className="text-xs sm:text-sm text-[#111111]/40 line-through">
                  ₹{item?.product?.price * item?.quantity}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
