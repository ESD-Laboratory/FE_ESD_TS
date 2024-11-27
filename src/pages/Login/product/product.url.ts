import { AxiosResponse } from "axios";
import axiosInstance from "../../../services/axiosInstance";  // Assuming you're using axiosInstance

function getProducts(params?: { on_development: boolean }): Promise<AxiosResponse> {
  return axiosInstance.get('/product', { params });
}

function addProduct(data: FormData): Promise<AxiosResponse> {
  return axiosInstance.post('/product/add', data);
}

function updateProductData(id: string, data: FormData): Promise<AxiosResponse> {
  return axiosInstance.put(`/product/${id}`, data);
}

function deleteProduct(id: string): Promise<AxiosResponse> {
  return axiosInstance.delete(`/product/${id}`);
}

const ProductService = {
  getProducts,
  addProduct,
  updateProductData,
  deleteProduct
};

export default ProductService;
