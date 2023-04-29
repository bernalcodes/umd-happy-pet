import Link from "next/link";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { useEffect, useState } from "react";
import Step1 from "../Steps/Step1/Step1";
import Step2 from "../Steps/Step2/Step2";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "@/interfaces/Form";
import Image from "next/image";
import { Backdrop, CircularProgress } from "@mui/material";

const initialForm: Form = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  typeUser: "",
  phoneNumber: 0,
  address: "",
  cardNumber: "",
};

const typeUsers: string[] = ["I'm Customer", "I'm a Veterinarian"];

const FormCardSignUp = () => {
  //TODO: create a password input. pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [additionalField, setAdditionalField] = useState<string>("");
  const [typeUserSelected, setTypeUserSelected] = useState(typeUsers[0]);

  // const {
  // 	hookForm: { handleSubmit, onSubmit },
  // 	methods: { nextStep, prevStep },
  // 	state: { step },
  // } = useSignUpForm();

  const onSubmit: SubmitHandler<Form> = (data: Form) => {
    if (typeUserSelected === typeUsers[0]) {
      delete data.cardNumber;
    } else {
      delete data.address;
    }
    console.log(data);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAditionalFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [additionalField]: value,
    }));
  };

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      typeUser: typeUserSelected,
    }));
    if (typeUserSelected === typeUsers[0]) {
      setAdditionalField("address");
    } else {
      setAdditionalField("cardNumber");
    }
  }, [typeUserSelected]);

  const selectTypeUser = (event: React.MouseEvent<HTMLLIElement>) => {
    const index = typeUsers.findIndex(
      (type) => type === event.currentTarget.textContent
    );
    setTypeUserSelected(typeUsers[index]);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[410px] flex-col items-center justify-end gap-3 px-5 py-12"
    >
      <div className="mt-4 flex w-full  flex-col gap-5">
        <Image
          src="/hp-logo.png"
          alt="happypet logo"
          width={1017}
          height={1017}
          className="h-auto w-20 bg-cover lg:w-16"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-medium text-happy-color-text lg:text-4xl">
            Sign Up
          </h2>
          <p className="text-1xl text-sm font-light text-happy-color-text lg:text-lg">
            Create your account now
          </p>
        </div>
      </div>

      <div className="flex min-h-[410px] w-full flex-col justify-between">
        {step === 0 && (
          <Step1
            form={form}
            typeUsers={typeUsers}
            typeUserSelected={typeUserSelected}
            selectTypeUser={selectTypeUser}
            handleInputChange={handleInputChange}
            handleAditionalFieldChange={handleAditionalFieldChange}
            register={register}
            errors={errors}
          />
        )}
        {step === 1 && (
          <Step2
            handleInputChange={handleInputChange}
            register={register}
            errors={errors}
          />
        )}
        <div className="mt-10 flex w-full items-end items-center justify-end gap-2">
          {step === 0 && (
            <button
              type="submit"
              className="button-style-primary w-fit"
              onClick={handleSubmit(nextStep)}
            >
              Next step
            </button>
          )}
          {step === 1 && (
            <>
              <button
                onClick={prevStep}
                className="cursor-pointer rounded-2xl border-2 border-solid border-transparent  px-5   py-3 text-center font-light text-happy-color-primary outline-none transition-all transition-colors hover:border-happy-color-primary hover:text-[#8a52ff]"
              >
                Back
              </button>
              <input
                type="submit"
                value="Continue"
                className="button-style-primary"
              />
            </>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col">
        <p className="mt-10 text-center text-sm font-light text-happy-color-text lg:text-base">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-normal text-happy-color-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormCardSignUp;
