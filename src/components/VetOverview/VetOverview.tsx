import { useCustomers } from "@/context/CustomersContext";
import {
  IconDefinition,
  faBook,
  faCalendarCheck,
  faPaw,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface VetOrverviewItemProps {
  label: string;
  count: number;
  color: string;
  bgColor: string;
  icon: IconDefinition;
}

const VetOrverviewItem = ({
  label,
  count,
  color,
  bgColor,
  icon,
}: VetOrverviewItemProps) => {
  return (
    <div className=" group flex min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl bg-white px-6 py-5">
      <FontAwesomeIcon
        icon={icon}
        className={`rounded-2xl p-3 text-base lg:p-4 lg:text-2xl ${bgColor} ${color}`}
      />
      <div className="flex flex-col">
        <p className="text-sm text-happy-grey group-hover:underline lg:text-base">
          {label}
        </p>
        <span className="text-base text-happy-color-text lg:text-xl">
          {count}
        </span>
      </div>
    </div>
  );
};



const VetOverview = () => {
	const {customers, pets, visits} = useCustomers();

	const data: VetOrverviewItemProps[] = [
		{
		  label: "Customers",
		  count: customers?.length,
		  color: "text-happy-pink",
		  bgColor: "bg-happy-light-pink",
		  icon: faUser,
		},
		{
		  label: "Pets",
		  count: pets?.length,
		  color: "text-happy-orange",
		  bgColor: "bg-happy-light-orange",
		  icon: faPaw,
		},
		{
		  label: "Appointments",
		  count: visits?.length,
		  color: "text-happy-blue",
		  bgColor: "bg-happy-light-blue",
		  icon: faCalendarCheck,
		},
	  ];

  return (
    <div className="m-auto flex max-w-screen-xl flex-col flex-wrap justify-around gap-5 rounded-xl px-8 py-8 lg:flex-row">
      {data.map((item, index) => (
        <VetOrverviewItem
          key={index}
          label={item.label}
          count={item.count}
          color={item.color}
          bgColor={item.bgColor}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default VetOverview;
