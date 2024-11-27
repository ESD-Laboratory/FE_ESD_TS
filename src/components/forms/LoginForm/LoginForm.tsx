import React, { useEffect, useReducer, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Make sure to import this
import { Button } from "../../elements/Button/Button";
import { useTypedDispatch } from "../../../store";
import { loginSchema } from "./schema"; // Ensure your schema is defined properly
import Input from "../../elements/Input/Input";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import EyePassword from "../../elements/EyePassword/EyePassword";
import { useLogin } from "../../../services/auth/auth.query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../../../store/user";

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const dispatchLogin = useTypedDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: doLogin,
    isPending,
    isSuccess,
  } = useLogin({
    onSuccess: (data) => {
      const { id, name, email } = data.data;
      // @ts-expect-error: token is not part of the data type
      const { token } = data;
      localStorage.setItem("access_token", token);

      dispatchLogin(
        setUser({
          id,
          email: name,
          role: email,
          token,
        }),
      );
      toast.success("Login success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [hideEye, dispatch] = useReducer((state: boolean) => !state, true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Handle the form submission logic here
    doLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...register("email")}
        // disabled={isPending}
        label="Nama pengguna"
        placeholder="Masukkan Nama Pengguna"
        // leftIcon={< className="text-textGrayColor h-5 w-5" />}
        error={errors.email?.message}
      />
      <Input
        {...register("password")}
        // disabled={isPending}
        label="Kata Sandi"
        placeholder="Kata Sandi"
        type={hideEye ? "password" : "text"}
        leftIcon={<LockClosedIcon className="text-textGrayColor h-5 w-5" />}
        rightIcon={
          <EyePassword
            name="password"
            isHide={hideEye}
            handleHidingEye={() => dispatch()}
          />
        }
        error={errors.password?.message}
      />

      <div className="form-control">
        <label className="label flex cursor-pointer items-center justify-start gap-3">
          <span className="label-text">Remember me</span>
          <input
            type="checkbox"
            {...register("remember")}
            disabled={isPending || isSubmitting || isSuccess}
            className="checkbox"
          />
        </label>
      </div>

      <div className="mb-5">
        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={isPending || isSubmitting}
        >
          Login {isPending && <div className="loader"></div>}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
