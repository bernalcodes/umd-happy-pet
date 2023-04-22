import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	FieldErrors,
	UseFormRegister,
	useForm,
	useFormContext,
} from "react-hook-form";
import Form from "@/interfaces/Form";

interface ComponentProps {
	register: UseFormRegister<Form>;
	errors: FieldErrors<Form>;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	typeUsers: string[];
	typeUserSelected: string;
	selectTypeUser: (event: React.MouseEvent<HTMLLIElement>) => void;
	form: Form;
	handleAditionalFieldChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}

const Step1 = ({
	register,
	errors,
	typeUsers,
	handleInputChange,
	selectTypeUser,
	typeUserSelected,
	handleAditionalFieldChange,
}: ComponentProps) => {
	return (
		<div className="flex flex-col items-center gap-5">
			<div className="flex flex-col items-start gap-[0.75rem]  lg:gap-[1.3125rem] w-full">
				<div className="flex flex-row items-start gap-[0.75rem] w-full">
					<div className="flex flex-col gap-1 flex-grow w-1/2 ">
						<input
							className={`input-style w-full ${
								errors.name
									? "border-[#ff9494]"
									: ""
							}`}
							placeholder="First name"
							{...register("name", {
								required: {
									value: true,
									message: "Name is required",
								},
								pattern: {
									value: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
									message: "This name is invalid",
								},
							})}
							onChange={handleInputChange}
						/>
						{errors.name && (
							<FormErrorText message={errors.name.message} />
						)}
					</div>
					<div className="flex flex-col gap-1 flex-grow w-1/2">
						<input
							className={`input-style w-full ${
								errors.lastName
									? "border-[#ff9494]"
									: ""
							}`}
							placeholder="Last name"
							{...register("lastName", {
								required: {
									value: true,
									message: "Last name is required",
								},
								pattern: {
									value: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
									message: "This last name is invalid",
								},
							})}
							onChange={handleInputChange}
						/>
						{errors.lastName && (
							<FormErrorText message={errors.lastName.message} />
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1 w-full">
					<input
						className={`input-style w-full ${
							errors.email
								? "border-[#ff9494]"
								: ""
						}`}
						placeholder="Email"
						{...register("email", {
							required: {
								value: true,
								message: "Email is required",
							},
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
								message: "This email is invalid",
							},
							//? alernative:  /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
						})}
						onChange={handleInputChange}
					/>
					{errors.email && (
						<FormErrorText message={errors.email.message} />
					)}
				</div>
				<div className="flex flex-col gap-1 w-full">
					<input
						type="number"
						className={`input-style w-full ${
							errors.phoneNumber
								? "border-[#ff9494]"
								: ""
						}`}
						placeholder="Phone number"
						{...register("phoneNumber", {
							required: {
								value: true,
								message: "Phone number is required",
							},
							//pattern: { value: /^[0-9]{10}$/, message: "Only numbers 😊" },
						})}
						onChange={handleInputChange}
					/>
					{errors.phoneNumber && (
						<FormErrorText message={errors.phoneNumber.message} />
					)}
				</div>
			</div>
			<div className="flex flex-col items-start gap-6  lg:gap-5 w-full">
				<div className="flex flex-col gap-4 w-full">
					<span className=" text-sm lg:text-base text-happy-color-text font-medium">
						Select the type of user you are
					</span>
					<ul className="flex flex-row border-happy-color-primary border-2 rounded-2xl w-full justify-around gap-2 p-1">
						{typeUsers.map((type) => (
							<li
								key={`type-${type}`}
								onClick={selectTypeUser}
								className={`${
									type === typeUserSelected
										? "text-white"
										: "text-happy-color-text"
								} text-sm lg:text-base relative transition-colors font-medium cursor-pointer w-full h-full p-[0.625rem] rounded-2xl text-center`}
							>
								<p className="relative z-20">{type}</p>
								{type === typeUserSelected && (
									<motion.div
										className="toggle-type-user"
										layoutId="toggle-type-user"
									/>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-row w-full">
					<label htmlFor="input-address" className="cursor-pointer">
						<div className="p-[11px]">
							{typeUserSelected === typeUsers[0] ? (
								<svg
									className="w-auto h-[1.875rem] stroke-happy-color-primary"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 9.25C18 13.1158 11 19.75 11 19.75C11 19.75 4 13.1158 4 9.25C4 7.39348 4.7375 5.61301 6.05025 4.30025C7.36301 2.9875 9.14348 2.25 11 2.25C12.8565 2.25 14.637 2.9875 15.9497 4.30025C17.2625 5.61301 18 7.39348 18 9.25Z"
										stroke="#A072FF"
										strokeWidth="1.3125"
									/>
									<path
										d="M11 10.125C11.2321 10.125 11.4546 10.0328 11.6187 9.86872C11.7828 9.70462 11.875 9.48206 11.875 9.25C11.875 9.01794 11.7828 8.79538 11.6187 8.63128C11.4546 8.46719 11.2321 8.375 11 8.375C10.7679 8.375 10.5454 8.46719 10.3813 8.63128C10.2172 8.79538 10.125 9.01794 10.125 9.25C10.125 9.48206 10.2172 9.70462 10.3813 9.86872C10.5454 10.0328 10.7679 10.125 11 10.125Z"
										fill="black"
										stroke="#A072FF"
										strokeWidth="1.3125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg
									className="w-auto h-[1.875rem] stroke-happy-color-primary"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17.125 18H4.875C4.41087 18 3.96575 17.8156 3.63756 17.4874C3.30937 17.1592 3.125 16.7141 3.125 16.25V8.375C3.125 7.91087 3.30937 7.46575 3.63756 7.13756C3.96575 6.80937 4.41087 6.625 4.875 6.625H17.125C17.5891 6.625 18.0342 6.80937 18.3624 7.13756C18.6906 7.46575 18.875 7.91087 18.875 8.375V16.25C18.875 16.7141 18.6906 17.1592 18.3624 17.4874C18.0342 17.8156 17.5891 18 17.125 18Z"
										stroke="#A072FF"
										strokeWidth="1.3125"
									/>
									<path
										d="M14.9375 12.75C14.8215 12.75 14.7102 12.7039 14.6281 12.6219C14.5461 12.5398 14.5 12.4285 14.5 12.3125C14.5 12.1965 14.5461 12.0852 14.6281 12.0031C14.7102 11.9211 14.8215 11.875 14.9375 11.875C15.0535 11.875 15.1648 11.9211 15.2469 12.0031C15.3289 12.0852 15.375 12.1965 15.375 12.3125C15.375 12.4285 15.3289 12.5398 15.2469 12.6219C15.1648 12.7039 15.0535 12.75 14.9375 12.75Z"
										fill="black"
										stroke="#A072FF"
										strokeWidth="1.3125"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M16.25 6.62496V5.40259C16.2499 5.1344 16.1882 4.86982 16.0696 4.62928C15.951 4.38874 15.7788 4.17866 15.5661 4.01529C15.3534 3.85191 15.106 3.7396 14.843 3.68703C14.5801 3.63446 14.3085 3.64303 14.0494 3.71209L4.42438 6.27846C4.05167 6.37778 3.72222 6.59745 3.48724 6.90332C3.25226 7.2092 3.12491 7.58413 3.125 7.96984V8.37496"
										stroke="#A072FF"
										strokeWidth="1.3125"
									/>
								</svg>
							)}
						</div>
					</label>
					<div className="flex flex-col gap-1 w-full">
						{typeUserSelected === typeUsers[0] && (
							<>
								<input
									id="input-address"
									className={`input-style w-full ${errors.address ? 'border-[#ff9494]' : ''}`}
									placeholder="Enter your Address"
									{...register("address", {
										required: {
											value: true,
											message: "Address is required",
										},
										pattern: {
											value: /^[a-zA-Z0-9\s\.\#\-]+$/,
											message: "This address is invalid",
										},
									})}
									onChange={handleAditionalFieldChange}
								/>
								{errors.address && (
									<FormErrorText
										message={errors.address?.message}
									/>
								)}
							</>
						)}
						{typeUserSelected === typeUsers[1] && (
							<>
								<input
									className={`input-style w-full ${errors.cardNumber ? 'border-[#ff9494]' : ''}`}
									placeholder="Enter your card number"
									{...register("cardNumber", {
										required: {
											value: true,
											message: "Card number is required",
										},	
									})}
									onChange={handleAditionalFieldChange}
								/>
								{errors.cardNumber && (
									<FormErrorText
										message={errors.cardNumber?.message}
									/>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Step1;
