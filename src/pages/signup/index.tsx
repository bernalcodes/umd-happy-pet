import FormCard from "@/components/FormCard/FormCard";
import React from "react";

//lg:w-[45%]
// w-[55%]
const index = () => {
	return (
		<div className="flex h-screen w-full flex-col md:flex-row">
			<div className="flex justify-center items-center w-full h-full">
				<FormCard />
			</div>
			<div className="w-full hidden md:flex bg-slate-300 bg-hero-signup bg-cover bg-center justify-center items-center">
				<h1 className="flex font-bold text-6xl mb-52"><p className="text-happy-color-primary">Happy</p>{" "}<p className="text-happy-color-text">ppet</p></h1>
			</div>
		</div>
	);
};

export default index;
