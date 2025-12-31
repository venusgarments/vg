// src/components/ProductsTable.jsx
import {
  Avatar,
  Button,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, deleteProduct } from "../Redux/Customers/Product/Action";
import navigation from "../Config/navigation";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customersProduct = useSelector((store) => store.customersProduct);
  const productsState =
    customersProduct.products || { content: [], currentPage: 1, totalPages: 1 };
  const loading = customersProduct.loading;
  const error = customersProduct.error;

  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  const [categoryFilter, setCategoryFilter] = useState({
    gender: "",
    main: "",
    sub: "",
  });

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  const buildReqData = () => {
    return {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 1,
      pageSize: 10,
      stock: availability && availability !== "All" ? availability : "",
    };
  };

  useEffect(() => {
    setFilterValue({
      availability: availability || "",
      category: category || "",
      sort: sort || "",
    });

    const reqData = buildReqData();
    dispatch(findProducts(reqData)).catch((err) =>
      console.error("findProducts error:", err)
    );
  }, [
    availability,
    category,
    sort,
    page,
    dispatch,
    customersProduct.deleteProduct,
  ]);

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleFilterChange = (e, sectionId) => {
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));

    if (!e.target.value) searchParams.delete(sectionId);
    else searchParams.set(sectionId, e.target.value);

    searchParams.set("page", 1);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleDeleteProduct = async (productId) => {
    if (!productId) return;
    try {
      if (!window.confirm("Delete this product?")) return;
      await dispatch(deleteProduct(productId));
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Delete failed");
    }
  };

  const handleUpdateProduct = (product) => {
    navigate("/add-product", { state: { product } });
  };

  // CATEGORY DROPDOWN LOGIC
  const genders = navigation.filter(
    (item) => item.id === "women" || item.id === "men"
  );

  const mainCategories =
    genders.find((g) => g.id === categoryFilter.gender)?.categories || [];

  const subCategories =
    mainCategories.find((c) => c.id === categoryFilter.main)?.subHeadings || [];

  const handleCategoryHierarchyChange = (key, value) => {
    const updated = { ...categoryFilter, [key]: value };

    if (key === "gender") {
      updated.main = "";
      updated.sub = "";
    }
    if (key === "main") {
      updated.sub = "";
    }

    setCategoryFilter(updated);

    if (key === "sub") {
      if (!value) searchParams.delete("category");
      else searchParams.set("category", value);

      searchParams.set("page", 1);
      navigate({ search: `?${searchParams.toString()}` });
    }
  };

  return (
    <div className="w-full">

      {/* ---------- SORT & CATEGORY FILTER SECTION ---------- */}
      <div className="p-4 shadow rounded bg-white mb-4">
        <h2 className="text-lg font-semibold mb-3">Sort</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Gender */}
          <div>
            <InputLabel>Gender</InputLabel>
<Select
  fullWidth
  displayEmpty
  value={categoryFilter.gender}
  renderValue={(val) => (val ? val : "Select Gender")}
  onChange={(e) => handleCategoryHierarchyChange("gender", e.target.value)}
>
  <MenuItem value="">Select Gender</MenuItem>
  {genders.map((g) => (
    <MenuItem key={g.id} value={g.id}>{g.title}</MenuItem>
  ))}
</Select>

          </div>

          {/* Main Category */}
          <div>
            <InputLabel>Main Category</InputLabel>
<Select
  fullWidth
  disabled={!categoryFilter.gender}
  displayEmpty
  value={categoryFilter.main}
  renderValue={(val) => (val ? val : "Select Main Category")}
  onChange={(e) => handleCategoryHierarchyChange("main", e.target.value)}
>
  <MenuItem value="">Select Main Category</MenuItem>
  {mainCategories.map((c) => (
    <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>
  ))}
</Select>

          </div>

          {/* Sub Category */}
          <div>
            <InputLabel>Sub Category</InputLabel>
<Select
  fullWidth
  disabled={!categoryFilter.main}
  displayEmpty
  value={categoryFilter.sub}
  renderValue={(val) => (val ? val : "Select Sub Category")}
  onChange={(e) => handleCategoryHierarchyChange("sub", e.target.value)}
>
  <MenuItem value="">Select Sub Category</MenuItem>
  {subCategories.map((s) => (
    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
  ))}
</Select>

          </div>
        </div>

        {/* Availability + Sort */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          <div>
            <InputLabel>Availability</InputLabel>
            <Select
              fullWidth
              value={filterValue.availability}
              onChange={(e) => handleFilterChange(e, "availability")}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"in_stock"}>Instock</MenuItem>
              <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
            </Select>
          </div>

          <div>
            <InputLabel>Sort By Price</InputLabel>
            <Select
              fullWidth
              value={filterValue.sort}
              onChange={(e) => handleFilterChange(e, "sort")}
            >
              <MenuItem value={"price_high"}>High - Low</MenuItem>
              <MenuItem value={"price_low"}>Low - High</MenuItem>
            </Select>
          </div>
        </div> */}
      </div>

      {/* ---------- PRODUCTS TABLE ---------- */}
      <div className="shadow rounded bg-white p-4">
        <h2 className="text-lg font-semibold mb-3">All Products</h2>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : (productsState?.content?.length || 0) === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                productsState.content.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Avatar
                        alt={item.title}
                        src={item.imageUrl?.[0] || item.images?.[0]}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography>{item.title}</Typography>
                      <Typography variant="caption">
                        {item.brand}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      {item.category?.name || item.category}
                    </TableCell>

                    <TableCell align="center">
                      {item.discountedPrice ?? item.price}
                    </TableCell>

                    <TableCell align="center">
                      {item.quantity}
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleUpdateProduct(item)}>
                        Update
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button onClick={() => handleDeleteProduct(item._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* ---------- PAGINATION ---------- */}
      <div className="mt-4 shadow bg-white rounded p-4 flex justify-center">
        <Pagination
          count={productsState?.totalPages || 1}
          color="primary"
          onChange={handlePaginationChange}
          page={Number(page)}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
