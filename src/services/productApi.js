import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}?limit=0`);
  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(
    `${API_URL}/category/${encodeURIComponent(category)}`
  );
  return response.data.products;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};
