import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VetOverviewLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
	return (
		<div className="w-fit rounded-md bg-white px-6 py-5 shadow-md lg:min-w-[400px]">
			<button className="flex items-center gap-2 pb-6 font-semibold text-blue-gray-400 hover:underline">
				<p className="text-lg font-normal">{title}</p>
				<FontAwesomeIcon
					icon={faChevronRight}
					className="relative top-[1px] text-[13px]"
				/>
			</button>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
};

export default VetOverviewLayout;
