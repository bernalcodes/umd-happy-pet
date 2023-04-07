import Link from "next/link";
import React, { useState } from "react";
import { motion } from 'framer-motion'

const typeUsers = ["I'm Customer", "I'm a Veterinarian"]

const FormCard = () => {

    const [typeUserSelected, setTypeUserSelected] = useState(typeUsers[0]);
    
    const selectTypeUser = (event: React.MouseEvent<HTMLLIElement>) => {
        const index = typeUsers.findIndex((type) => type === event.currentTarget.textContent);
        setTypeUserSelected(typeUsers[index]);
    };

	return (
		<div className="flex flex-col justify-center items-center p-3 gap-3">
			<div className="flex flex-col gap-[20px] w-full">
				<h2 className="text-4xl font-semibold text-happy-color-text">
					Sign Up
				</h2>
				<p className="text-lg font-normal text-happy-color-text">
					Create your account now
				</p>
			</div>
			<div className="flex flex-col items-center gap-[2.375rem]">
				<div className="flex flex-col items-start gap-[1.3125rem]">
					<div className="flex flex-row items-start gap-[0.75rem]">
						<input
							className="input-style"
							type="text"
							placeholder="First name"
						/>
						<input
							className="border-2 rounded-2xl border-solid border-happy-grey p-3 outline-none hover:border-happy-color-primary focus:border-happy-color-primary"
							type="text"
							placeholder="Last name"
						/>
					</div>
					<input
						className="input-style w-full"
						type="email"
						placeholder="Email"
					/>
					<input
						className="input-style w-full"
						type="number"
						placeholder="Phone number"
					/>
				</div>
				<div className="flex flex-col items-start gap-[2.375rem] w-full">
					<div className="flex flex-col gap-4 w-full">
						<span className="text-base text-happy-color-text font-medium">
							Select the type of user you are
						</span>
						<ul className="flex flex-row border-happy-color-primary border-2 rounded-2xl w-full justify-around gap-2 p-1">
                                {
                                    typeUsers.map(type => (
                                        <li key={`type-${type}`} onClick={selectTypeUser} className={`${type === typeUserSelected ? "text-white" : "text-happy-color-text"} relative transition-colors font-medium cursor-pointer w-full h-full p-[0.625rem] rounded-2xl text-center`}>
                                            <p className="relative z-20">{type}</p>
                                            {(type === typeUserSelected) && (<motion.div className="toggle-type-user" layoutId="toggle-type-user"/>)}
                                        </li>
                                    ))
                                }
						</ul>
					</div>
					<div className="flex flex-row w-full">
                        <label htmlFor="input-adress" className="cursor-pointer">
                            <div className="p-[11px]">
                            <svg className="w-auto h-[1.875rem] stroke-happy-color-primary" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 9.25C18 13.1158 11 19.75 11 19.75C11 19.75 4 13.1158 4 9.25C4 7.39348 4.7375 5.61301 6.05025 4.30025C7.36301 2.9875 9.14348 2.25 11 2.25C12.8565 2.25 14.637 2.9875 15.9497 4.30025C17.2625 5.61301 18 7.39348 18 9.25Z" stroke="#A072FF" stroke-width="1.3125"/>
                                <path d="M11 10.125C11.2321 10.125 11.4546 10.0328 11.6187 9.86872C11.7828 9.70462 11.875 9.48206 11.875 9.25C11.875 9.01794 11.7828 8.79538 11.6187 8.63128C11.4546 8.46719 11.2321 8.375 11 8.375C10.7679 8.375 10.5454 8.46719 10.3813 8.63128C10.2172 8.79538 10.125 9.01794 10.125 9.25C10.125 9.48206 10.2172 9.70462 10.3813 9.86872C10.5454 10.0328 10.7679 10.125 11 10.125Z" fill="black" stroke="#A072FF" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </div>
                        </label>
						<input
                            id="input-adress"
							className="input-style w-full"
							placeholder="enter your adress"
						/>
					</div>
				</div>
				<div className="w-full flex flex-col gap-4 items-center">
					<button className="bg-happy-color-primary text-happy-color-text hover:bg-[#8a52ff] transition-colors text-white p-3 w-full rounded-2xl font-semibold">
						Continue
					</button>
					<p className="text-happy-color-text">
						Already have an account?
						<Link href="/login" className="text-happy-color-primary hover:underline ml-1">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default FormCard;
