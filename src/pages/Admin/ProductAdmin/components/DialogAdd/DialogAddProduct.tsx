import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../../components/elements/Button/Button";
import {
  Modal,
  ModalBox,
} from "../../../../../components/elements/Modal/Modal";
import ProductForm from "../../../../../components/forms/ProductForm";
import { useAddProduct } from "../../../../Login/product/product.query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { productSchema } from "../../../../../components/forms/ProductForm/schema";

interface DialogAddProductProps {
  onClose: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product: "",
      description: "",
      category: "",
      on_development: "false",
    },
  });

  const { mutate: addProduct, isPending } = useAddProduct({
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      onClose();
    },
    onError: (err) => {
      toast.error("Failed to add product");
      console.error(err);
    },
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    const formData = new FormData();
    formData.append("product", data.product);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("on_development", data.on_development);

    if (image) {
      formData.append("image", image);
    }

    addProduct(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal id="add-product-dialog">
      <ModalBox>
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <Button className="!rounded-full !p-2" onClick={onClose}>
            <XMarkIcon className="size-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductForm
            register={register}
            errors={errors}
            isPending={isPending}
            handleFileChange={handleFileChange}
            isSubmitting={isSubmitting}
          />
        </form>
      </ModalBox>
    </Modal>
  );
};

export default DialogAddProduct;
