import { RaceBy } from "@uiball/loaders";
import React from "react";

const Loader = () => {
	return (
		<div className="h-screen font-bold w-full flex flex-col gap-3 justify-center items-center">
			<h3 className="font-bold">Loading...</h3>
			<RaceBy size={80} lineWeight={5} speed={1.4} color="#A072FF" />
		</div>
	);
};

export default Loader;
