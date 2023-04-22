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
			className="flex flex-col justify-end items-center px-5 py-12 w-full max-w-[410px] gap-3"
		>
			<div className="flex flex-col gap-5  mt-4 w-full">
				<Image
					src="/hp-logo.png"
					alt="happypet logo"
					width={1017}
					height={1017}
					className="h-auto lg:w-16 w-20 bg-cover"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="text-3xl lg:text-4xl font-semibold text-happy-color-text">
						Sign Up
					</h2>
					<p className="text-1xl text-sm lg:text-lg font-normal text-happy-color-text">
						Create your account now
					</p>
				</div>
			</div>

			<div className="flex flex-col justify-between min-h-[410px] w-full">
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
				<div className="flex justify-end items-center gap-2 w-full items-end mt-10">
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
								className="transition-all border-2 border-solid border-transparent hover:text-[#8a52ff]  hover:border-happy-color-primary  outline-none text-center cursor-pointer text-happy-color-primary transition-colors px-5 py-3 rounded-2xl font-semibold"
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

			<div className="flex flex-col w-full">
				<p className="text-happy-color-text text-sm text-center lg:text-base mt-10">
					Already have an account?
					<Link
						href="/login"
						className="text-happy-color-primary hover:underline ml-1"
					>
						Log In
					</Link>
				</p>
			</div>
		</form>
	);
};

export default FormCardSignUp;
