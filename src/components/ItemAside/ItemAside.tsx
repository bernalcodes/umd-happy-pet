import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ItemAsideProps {
    icon: IconDefinition;
    label: string;
}

const ItemAside = ({icon, label}: ItemAsideProps) => {
	return (
		<div className="text-md flex items-center cursor-pointer gap-3	 hover:bg-happy-color-primary hover:text-white text-happy-color-text py-2 px-4 rounded-xl">
			<FontAwesomeIcon icon={icon} className="text-[18px]" />
			<p className="font-semibold text-md">{label}</p>
		</div>
	);
};

export default ItemAside;
