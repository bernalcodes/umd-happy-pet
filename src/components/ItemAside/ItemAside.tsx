import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ItemAsideProps {
  icon: IconDefinition;
  label: string;
}

const ItemAside = ({ icon, label }: ItemAsideProps) => {
  return (
    <div className="text-md flex cursor-pointer items-center gap-3	 rounded-xl px-4 py-2 text-happy-color-text hover:bg-happy-color-primary hover:text-white">
      <FontAwesomeIcon icon={icon} className="text-[18px]" />
      <p className="text-md font-semibold">{label}</p>
    </div>
  );
};

export default ItemAside;
