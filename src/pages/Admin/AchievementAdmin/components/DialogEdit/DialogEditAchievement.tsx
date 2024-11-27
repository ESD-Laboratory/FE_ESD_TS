import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../../components/elements/Button/Button";
import {
  Modal,
  ModalBox,
} from "../../../../../components/elements/Modal/Modal";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { achievementSchema } from "../../../../../components/forms/AchievementForm/schema";
import { useUpdateAchievementData } from "../../../../../services/achievement/achievement.query";
import AchievementForm from "../../../../../components/forms/AchievementForm/AchievementForm";

export interface TAchievementEdit {
  id?: string;
  name: string;
  detail: string;
  organizer: string;
  image: string;
  date: string;
}

interface DialogEditAchievementProps {
  selectedAchievement: TAchievementEdit;
  onClose: () => void;
}

const DialogEditAchievement: React.FC<DialogEditAchievementProps> = ({
  selectedAchievement,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAchievementEdit>({
    resolver: zodResolver(achievementSchema),
    defaultValues: selectedAchievement, // Populate form with selectedAchievement data
  });

  useEffect(() => {
    reset(selectedAchievement);
    setValue("image", selectedAchievement.image);
  }, [selectedAchievement, reset, setValue]);

  const { mutate: updateAchievement, isPending } = useUpdateAchievementData({
    onSuccess: () => {
      toast.success("Achievement updated successfully");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      // Reset the form upon successful submission
      reset();
      onClose();
    },
    onError: (err) => {
      toast.error("Failed to update achievement");
      console.error(err);
    },
  });

  console.log(selectedAchievement);

  const onSubmit: SubmitHandler<TAchievementEdit> = (data) => {
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("name", data.name);
    formData.append("detail", data.detail);
    formData.append("organizer", data.organizer);
    formData.append("date", data.date);

    // Append the image if it exists
    if (image) {
      formData.append("image", image);
    }

    // Call the mutation with formData to update the achievement
    updateAchievement({
      id: selectedAchievement.id!,
      data: formData,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal id="edit-achievement-dialog">
      <ModalBox>
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Edit Achievement</h1>
          <Button className="!rounded-full !p-2" onClick={onClose}>
            <XMarkIcon className="size-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AchievementForm
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

export default DialogEditAchievement;
