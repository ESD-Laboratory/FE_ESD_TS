import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import ProductService from './product.url';

// Query for GET products by status
export const useGetProducts = (params?: { on_development: boolean }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => ProductService.getProducts(params),
  });
};

// Mutation for ADD product
export const useAddProduct = (
  options?: UseMutationOptions<AxiosResponse, unknown, FormData>,
) => {
  return useMutation<AxiosResponse, unknown, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await ProductService.addProduct(data);
      return response.data.data;
    },
    ...options,
  });
};

// Mutation for UPDATE product data
export const useUpdateProductData = (
  options?: UseMutationOptions<AxiosResponse, unknown, { id: string; data: FormData }>,
) => {
  return useMutation<AxiosResponse, unknown, { id: string; data: FormData }>({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await ProductService.updateProductData(id, data);
      return response.data;
    },
    ...options,
  });
};

// Mutation for DELETE product
export const useDeleteProduct = (
  options?: UseMutationOptions<void, unknown, string>,
) => {
  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await ProductService.deleteProduct(id);
    },
    ...options,
  });
};
