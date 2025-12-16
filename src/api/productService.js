import { api } from "./api";

// GET all products
export const fetchProducts = () => api.get("/product");

// GET single product
export const fetchProductById = (id) => api.get(`/product/${id}`);

// GET all categories
export const fetchCategories = () => api.get("/category");
