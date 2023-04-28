import Image from "next/image";
import React, { Fragment } from "react";
import VetOverviewLayout from "../VetOverviewLayout/VetOverviewLayout";

const VetOverviewPetsItem = ({ pet }: { pet: Pet }) => {
	return (
		<div className="group flex cursor-pointer items-center justify-between gap-5">
			<div className="flex items-center gap-2">
				<Image
					src={pet.img}
					className="h-11 w-11 rounded-xl shadow-md"
					height={200}
					width={200}
					alt="any"
				/>
				<div className="flex flex-col">
					<p className="font-normal group-hover:text-happy-color-primary group-hover:underline">
						{pet.name}
					</p>
					<p className="text-blue-gray-400">{pet.breed}</p>
				</div>
			</div>
			<span className="hover:underline inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">See more</span>
		</div>
	);
};

const VetOverviewCustomerItem = ({ customer }: { customer: Customer }) => {
	return (
		<div className="group flex cursor-pointer items-center justify-between gap-5 hover:bg-blue-gray-50 rounded-lg px-2 py-1">
			<div className="flex items-center gap-2 ">
				<div className="flex gap-2">
					<span className="w-[3px] bg-happy-color-primary rounded-full text-transparent">g</span>
					<Image
						src={customer.img}
						className="h-11 w-11 rounded-xl shadow-md"
						height={200}
						width={200}
						alt="any"
					/>
				</div>
				<div className="flex flex-col">
					<p className="font-normal group-hover:text-happy-color-primary group-hover:underline">
						{customer.name}
					</p>
					<p className="text-blue-gray-400">{customer.address}</p>
				</div>
			</div>
			<p className="text-blue-gray-700">4 pets</p>
		</div>
	);
};

const pets: Pet[] = [
	{
		name: "Luna",
		breed: "Poodle",
		img: "https://placeimg.com/400/400/animals",
		id: "1",
		age: 2,
		color: "Red",
		owner: "Andres",
	},
	{
		name: "Pepita de tomate",
		breed: "Poodle",
		img: "https://placeimg.com/400/400/any",
		id: "1",
		age: 2,
		color: "Red",
		owner: "Andres",
	},
	{
		name: "Pepita de tomate",
		breed: "Poodle",
		img: "https://placeimg.com/400/400/any",
		id: "1",
		age: 2,
		color: "Red",
		owner: "Andres",
	},
];

const customers: Customer[] = [
	{ id: "1", name: "Andres", img: "https://placeimg.com/400/400/people", age: 2, address: "Calle 123", pets: ["1", "2"] },
	{ id: "1", name: "Juana", img: "https://placeimg.com/400/400/people", age: 2, address: "Calle 123", pets: ["1", "2"] },
]

const VetOverviewCard = () => {
	return (
		<Fragment>
			<VetOverviewLayout title="Pets">
				{pets.map((pet, index) => (
					<VetOverviewPetsItem pet={pet} key={index} />
				))}
			</VetOverviewLayout>
			<VetOverviewLayout title="Customers">
				{customers.map((customer, index) => (
					<VetOverviewCustomerItem customer={customer} key={index} />
				))}
			</VetOverviewLayout>
		</Fragment>
	);
};

export default VetOverviewCard;
