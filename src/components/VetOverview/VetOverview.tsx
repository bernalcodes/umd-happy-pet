import { IconDefinition, faBook, faCalendarCheck, faPaw, faUser } from "@fortawesome/free-solid-svg-icons";
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
    icon
}: VetOrverviewItemProps) => {
	return (
		<div className=" bg-white px-6 py-5 min-w-[220px] rounded-2xl flex gap-3 items-center cursor-pointer group">
			<FontAwesomeIcon
				icon={icon}
				className={`lg:p-4 p-3 rounded-2xl lg:text-2xl text-base ${bgColor} ${color}`}
			/>
			<div className="flex flex-col">
				<p className="text-happy-grey lg:text-base text-sm group-hover:underline">{label}</p>
				<span className="text-happy-color-text lg:text-xl text-base">{count}</span>
			</div>
		</div>
	);
};

const data: VetOrverviewItemProps[] = [
	{
		label: "Customers",
		count: 12,
		color: "text-happy-pink",
		bgColor: "bg-happy-light-pink",
        icon: faUser
	},
	{
		label: "Pets",
		count: 15,
		color: "text-happy-orange",
		bgColor: "bg-happy-light-orange",
        icon: faPaw
	},
    {
        label: "Reports",
        count: 6,
        color: "text-happy-green",
        bgColor: "bg-happy-light-green",
        icon: faBook
    },
	{
		label: "Appointments",
		count: 10,
		color: "text-happy-blue",
		bgColor: "bg-happy-light-blue",
        icon: faCalendarCheck
	},
];

const VetOverview = () => {
	return (
		<div className="flex lg:flex-row justify-around max-w-screen-xl m-auto gap-5 py-8 px-8 flex-col rounded-xl flex-wrap">
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
