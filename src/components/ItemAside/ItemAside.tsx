import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ItemAsideProps {
    icon: IconDefinition;
    label: string;
}

const ItemAside = ({icon, label}: ItemAsideProps) => {
	return (
		<div className="flex items-center cursor-pointer gap-5 hover:bg-happy-color-primary hover:text-white text-happy-color-text py-3 px-4 rounded-xl transition-colors">
			<FontAwesomeIcon icon={icon} className="text-[18px]" />
			<p className="font-semibold text-lg">{label}</p>
		</div>
	);
};

export default ItemAside;
