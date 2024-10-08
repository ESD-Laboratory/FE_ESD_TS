import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../../components/elements/Button/Button";
import {
  Modal,
  ModalBox,
} from "../../../../../components/elements/Modal/Modal";
import MemberForm from "../../../../../components/forms/MemberForm";
import { useAddMember } from "../../../../../services/member/member.query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { memberSchema } from "../../../../../components/forms/MemberForm/schema";

interface DialogAddMemberProps {
  onClose: () => void;
}

const DialogAddMember: React.FC<DialogAddMemberProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Member>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      role: "",
      status: "",
    }, // Initial empty values
  });

  const { mutate: addMember, isPending } = useAddMember({
    onSuccess: () => {
      toast.success("Member added successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });

      // Reset the form upon successful submission
      reset();
      onClose();
    },
    onError: (err) => {
      toast.error("Failed to add member");
      console.error(err);
    },
  });

  const onSubmit: SubmitHandler<Member> = (data) => {
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("status", data.status);

    // Append the image if it exists
    if (image) {
      formData.append("image", image);
    }

    // Call the mutation with formData
    addMember(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal id="add-member-dialog">
      <ModalBox>
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Add Member</h1>
          <Button className="!rounded-full !p-2" onClick={onClose}>
            <XMarkIcon className="size-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MemberForm
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

export default DialogAddMember;
