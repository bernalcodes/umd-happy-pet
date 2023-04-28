import Link from "next/link";
import FormErrorText from "../FormErrorText/FormErrorText";
import { useLogIn } from "@/hooks/useLogIn";


const FormCardLogIn = () => {
    
    const { 
        hookForm: {
            register,
            handleSubmit,
            onSubmit,
            errors
        },
        methods: {
            handleInputChange
        }
    } = useLogIn();


    

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center items-center px-5 pb-12 gap-10"
		>
			<div className="flex flex-col gap-[10px] w-full justify-center">
				<h2 className="text-3xl lg:text-4xl font-medium text-happy-color-text text-center">
					Welcome back!
				</h2>
				<p className="text-1xl text-sm lg:text-lg font-light text-happy-color-text text-center">
					Please enter your credentials
				</p>
			</div>
			<div className="flex flex-col items-center gap-[2.375rem]">
				<div className="flex flex-col items-start gap-3 w-full">
					<div className="flex flex-col gap-1 w-full">
						<input
							className={`input-style w-full ${
								errors.email
									? "border-[#ff9494]"
									: ""
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
					<div className="flex flex-col gap-1 w-full">
						<input
                            type="password"
							className={`input-style w-full ${
								errors.password
									? "border-[#ff9494]"
									: ""
							}`}
							placeholder="password"
							{...register("password", {
								required: true,
							})}
							onChange={handleInputChange}
						/>
						{errors.password?.type === "required" && (
							<FormErrorText
								message={`The field Password is required`}
							/>
						)}
					</div>
				</div>
				<div className="w-full flex flex-col gap-12 items-center">
					<input
						type="submit"
						value="Continue"
						className="bg-happy-color-primary outline-none text-center cursor-pointer text-happy-color-text hover:bg-happy-color-primary-light transition-colors text-white p-3 w-full rounded-2xl font-semibold"
					/>
					<p className="text-happy-color-text text-sm font-light lg:text-base">
						You do not have an account?
						<Link
							href="/signup"
							className="text-happy-color-primary font-normal hover:underline ml-1"
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
