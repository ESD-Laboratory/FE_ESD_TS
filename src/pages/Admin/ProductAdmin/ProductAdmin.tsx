import React, { useState, useMemo } from "react";
import {
  useDeleteProduct,
  useGetProducts,
} from "../../Login/product/product.query";
import ProductTable from "./components/Table/ProductTable";
import Card from "../../../components/elements/Card/Card";
import { Button } from "../../../components/elements/Button/Button";
import DialogRemove from "../../../components/ui/DialogRemove/DialogRemove";
import { closeModal, openModal } from "../../../utils/modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import DialogAddProduct from "./components/DialogAdd/DialogAddProduct";
import DialogEditProduct from "./components/DialogEdit/DialogEditProduct";

const ProductAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [deletedItem, setDeletedItem] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });

  const { id: deletedId, name: deletedName } = deletedItem;

  const { data: productData, isFetching, isError } = useGetProducts();
  const { mutate: deleteProduct, isPending: pendingDelete } = useDeleteProduct({
    onSuccess: () => {
      setDeletedItem({ id: "", name: "" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal("modal-delete");
      toast.success("Product deleted successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete product");
    },
  });

  console.log(productData);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Array.isArray(productData)
    ? Math.ceil(productData.length / pageSize)
    : 1;

  const tableData = useMemo(() => {
    if (Array.isArray(productData)) {
      return productData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      );
    }
    return [];
  }, [productData, currentPage]);

  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      <Card className="space-y-6 p-6">
        <div className="inline-flex w-full justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <Button
            onClick={() => {
              openModal("add-product-dialog");
            }}
          >
            Add Product
          </Button>
        </div>
        {/* <ProductTable
          products={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedProduct={setSelectedProduct}
          setDeletedItem={setDeletedItem}
          setCurrentPage={setCurrentPage}
          isLoading={isFetching}
        /> */}
      </Card>

      <DialogAddProduct
        onClose={() => {
          closeModal("add-product-dialog");
        }}
      />

      {selectedProduct ? (
        <DialogEditProduct
          selectedProduct={selectedProduct}
          onClose={() => {
            closeModal("edit-product-dialog");
            setSelectedProduct(undefined);
          }}
        />
      ) : null}

      <DialogRemove
        isPending={pendingDelete}
        title={`Delete ${deletedName}`}
        onConfirm={() => {
          deleteProduct(deletedId);
        }}
        onClose={() => {
          closeModal("modal-delete");
        }}
      />
    </>
  );
};

export default ProductAdmin;
