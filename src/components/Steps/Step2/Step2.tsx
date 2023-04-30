import FormErrorText from "@/components/FormErrorText/FormErrorText";
import Form from "@/interfaces/Form";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PropsComponent {
  register: UseFormRegister<Form>;
  errors: FieldErrors<Form>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2 = ({ register, errors, handleInputChange }: PropsComponent) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEquals, setIsEquals] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handleInputChange(event);
    if (event.target.value !== confirmPassword) {
      setIsEquals(false);
    } else {
      setIsEquals(true);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setIsEquals(false);
    } else {
      setIsEquals(true);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-5 flex flex-col gap-4 ">
        <p className="w-[386px] text-sm font-light text-happy-color-text lg:text-base">
          Create a new password
        </p>
        <div className="flex w-full flex-col gap-1">
          <input
            type="password"
            autoComplete="off"
            className="input-style w-full"
            placeholder="Enter a password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/,
                message: "The password is very weak 😔",
              },
              validate: (_) => {
                if (password !== confirmPassword) {
                  return "Passwords do not match";
                }
              },
            })}
            onChange={(e) => {
              handlePasswordChange(e);
              handleInputChange(e);
            }}
          />
          {errors.password && errors.password.type !== "validate" && (
            <FormErrorText message={errors.password.message} />
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <input
            type="password"
            autoComplete="off"
            className="input-style w-full"
            placeholder="Cofirm a password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
              validate: (_) => {
                if (password !== confirmPassword) {
                  return "Passwords do not match";
                }
              },
            })}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && isEquals && confirmPassword === "" && (
            <FormErrorText message={errors.confirmPassword?.message} />
          )}
          {!isEquals && confirmPassword !== "" && (
            <FormErrorText message="Passwords do not match" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
