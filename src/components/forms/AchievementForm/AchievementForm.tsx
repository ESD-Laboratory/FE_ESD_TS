import Input from "../../elements/Input/Input";
import { Button } from "../../elements/Button/Button";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TAchievement } from "../../../services/achievement/achievement.query";

interface AchievementFormProps {
  register: UseFormRegister<TAchievement>;
  errors: FieldErrors<TAchievement>;
  isPending?: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
}

const AchievementForm: React.FC<AchievementFormProps> = ({
  register,
  errors,
  isPending,
  handleFileChange,
  isSubmitting,
}) => {
  return (
    <>
      <Input
        {...register("name")}
        disabled={isPending}
        label="Achievement Name"
        placeholder="Enter Achievement Name"
        error={errors.name?.message}
      />

      <label className={`form-control w-full`}>
        <span className="label-text text-base font-medium capitalize">
          Achievement Detail
        </span>

        <textarea
          className="placeholder:text-textGrayColor form-control input input-bordered w-full  placeholder:text-sm"
          {...register("detail")}
          disabled={isPending}
          placeholder="Enter Achievement Detail"
        />
        <p>{errors.detail?.message}</p>
      </label>

      <Input
        {...register("organizer")}
        disabled={isPending}
        label="Organizer"
        placeholder="Enter Organizer"
        error={errors.organizer?.message}
      />

      <Input
        {...register("date")}
        disabled={isPending}
        type="date"
        label="Date"
        placeholder="Enter Date"
        error={errors.date?.message}
      />

      <Input
        type="file"
        disabled={isPending}
        label="Achievement Photo"
        placeholder="Upload Achievement Photo"
        error={errors.image?.message}
        onChange={handleFileChange} // Set file change handler for image upload
      />

      <div className="mt-5">
        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={isPending || isSubmitting}
        >
          Submit {isPending && <div className="loader"></div>}
        </Button>
      </div>
    </>
  );
};

export default AchievementForm;
