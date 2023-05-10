import Image from "next/image";
import React, { Fragment } from "react";
import VetOverviewLayout from "../VetOverviewLayout/VetOverviewLayout";
import { CustomersDataContext, useCustomers } from "@/context/CustomersContext";
import users from "../../data/users.json" assert { type: "JSON" };

const VetOverviewPetsItem = ({ pet }: { pet: Pet }) => {
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <Image
          // @ts-ignore
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
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:underline">
        See more
      </span>
    </div>
  );
};

const VetOverviewCustomerItem = ({
  customer,
}: {
  customer: Customer | any;
}) => {
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-5 rounded-lg px-2 py-1 hover:bg-blue-gray-50">
      <div className="flex items-center gap-2 ">
        <div className="flex gap-2">
          <span className="w-[3px] rounded-full bg-happy-color-primary text-transparent">
            g
          </span>
          <Image
            //src="https://placeimg.com/200/200/any"
            src={customer.image}
            className="h-11 w-11 rounded-xl shadow-md"
            height={200}
            width={200}
            alt="any"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-normal group-hover:text-happy-color-primary group-hover:underline">
            {customer.firstName}
          </p>
          <p className="text-blue-gray-400">{customer.address.address}</p>
        </div>
      </div>
      <p className="text-blue-gray-700">4 pets</p>
    </div>
  );
};

const VetOverviewCard = () => {
  const { customers }: CustomersDataContext = useCustomers();

  console.log(users);

  return (
    <Fragment>
      <VetOverviewLayout title="Pets">
        {/*{users.map((pet, index) => (*/}
        {/*  <VetOverviewPetsItem pet={pet} key={index} />*/}
        {/*))}*/}
        <div className="flex cursor-pointer items-center justify-between gap-5 rounded-lg px-2 py-1 hover:bg-blue-gray-50">
          See all pets
        </div>
      </VetOverviewLayout>
      <VetOverviewLayout title="Customers">
        {users.slice(0, 3).map((customer, index) => (
          <VetOverviewCustomerItem customer={customer} key={index} />
        ))}
        <div className="flex cursor-pointer items-center justify-between gap-5 rounded-lg px-2 py-1 hover:bg-blue-gray-50">
          See all customers
        </div>
      </VetOverviewLayout>
    </Fragment>
  );
};

export default VetOverviewCard;
