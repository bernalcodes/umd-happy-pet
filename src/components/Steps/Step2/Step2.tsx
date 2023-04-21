import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import Form from "@/interfaces/Form";
import React, {MouseEventHandler} from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PropsComponent {
	register: UseFormRegister<Form>;
	errors: FieldErrors<Form>;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2 = ({ register, errors, handleInputChange }: PropsComponent) => {

	const [currrentPass, setCurrrentPass] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		setCurrrentPass(e.target.value)
	}

	return (
		<div>
			<div className="flex flex-col gap-4 mt-5 ">
				<p className="text-sm lg:text-base text-happy-color-text font-medium">Create a new password</p>
				<input
					type="password"
					autoComplete="off"
					className="input-style w-full"
					placeholder="Enter a password"
				/>
				<input
					type="password"
					autoComplete="off"
					className="input-style w-full"
					placeholder="Cofirm a password"
					{...register("password", {
						required: true,
						pattern:
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/,
					})}
					onChange={handleChange}
				/>
			</div>
			{errors.password?.type === "required" && (
				<FormErrorText message="Password is required" />
			)}
			{errors.password?.type === "pattern" && (
				<FormErrorText message="The password is very weak 😔" />
			)}
		</div>
	);
};

export default Step2;
