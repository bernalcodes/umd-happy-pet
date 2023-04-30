import Link from "next/link";
import FormErrorText from "../FormErrorText/FormErrorText";
import { useLogIn } from "@/hooks/useLogIn";

const FormCardLogIn = () => {
  const {
    hookForm: { register, handleSubmit, onSubmit, errors },
    methods: { handleInputChange },
  } = useLogIn();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-10 px-5 pb-12"
    >
      <div className="flex w-full flex-col justify-center gap-[10px]">
        <h2 className="text-center text-3xl font-medium text-happy-color-text lg:text-4xl">
          Welcome back!
        </h2>
        <p className="text-1xl text-center text-sm font-light text-happy-color-text lg:text-lg">
          Please enter your credentials
        </p>
      </div>
      <div className="flex flex-col items-center gap-[2.375rem]">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col gap-1">
            <input
              className={`input-style w-full ${
                errors.email ? "border-[#ff9494]" : ""
              }`}
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
              })}
              onChange={handleInputChange}
            />
            {errors.email?.type === "pattern" && (
              <FormErrorText message="Please enter a valid email" />
            )}
            {errors.email?.type === "required" && (
              <FormErrorText message="The field Email is required" />
            )}
          </div>
          <div className="flex w-full flex-col gap-1">
            <input
              type="password"
              className={`input-style w-full ${
                errors.password ? "border-[#ff9494]" : ""
              }`}
              placeholder="password"
              {...register("password", {
                required: true,
              })}
              onChange={handleInputChange}
            />
            {errors.password?.type === "required" && (
              <FormErrorText message={`The field Password is required`} />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-12">
          <input
            type="submit"
            value="Continue"
            className="w-full cursor-pointer rounded-2xl bg-happy-color-primary p-3 text-center font-semibold text-happy-color-text text-white outline-none transition-colors hover:bg-happy-color-primary-light"
          />
          <p className="text-sm font-light text-happy-color-text lg:text-base">
            You do not have an account?
            <Link
              href="/signup"
              className="ml-1 font-normal text-happy-color-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default FormCardLogIn;
