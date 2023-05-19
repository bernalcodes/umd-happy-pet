import Image from "next/image";
import React, { Fragment } from "react";
import VetOverviewLayout from "../VetOverviewLayout/VetOverviewLayout";
import { CustomersDataContext, useCustomers } from "@/context/CustomersContext";
import users from "../../data/users.json" assert { type: "JSON" };
import { calcLength, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ModalCreateDate } from "@/components/ModalCreateDate/ModalCreateDate";

const VetOverviewPetsItem = ({
  pet,
  image,
  key,
}: {
  pet: Pet;
  image: string;
  key: number;
}) => {
  const { customers } = useCustomers();
  console.log({pet})
  const owner = customers.filter((customer) => customer.personDetails.id === pet?.owner_id);

  console.log({owner})

  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-5"
      key={key}
    >
      <div className="flex items-center gap-2">
        <Image
          // @ts-ignore
          src={image}
          className="h-11 w-11 rounded-xl shadow-md"
          height={200}
          width={200}
          alt="any"
        />
        <div className="flex flex-col">
          <div className="flex gap-2">
            <p className="font-normal group-hover:text-happy-color-primary group-hover:underline">
              {pet.name}
            </p>
            <p className="text-blue-gray-400">{pet?.specs}</p>
          </div>
          <p>Owner: {owner[0]?.userDetails.email}</p>
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
  image,
}: {
  customer: Customer | any;
  image: any;
}) => {
	console.log({customer})
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-5 rounded-lg px-2 py-1 hover:bg-blue-gray-50">
      <div className="flex items-center gap-2 ">
        <div className="flex gap-2">
          <span className="w-[3px] rounded-full bg-happy-color-primary text-transparent">
            g
          </span>
          <Image
            //src="https://placeimg.com/200/200/any"
            src={`${image}`}
            className="h-11 w-11 rounded-xl shadow-md"
            height={200}
            width={200}
            alt="any"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-normal group-hover:text-happy-color-primary group-hover:underline">
            {customer.personDetails.name}
          </p>
          <p className="text-blue-gray-400">{"customer.address.address"}</p>
        </div>
      </div>
      <p className="text-blue-gray-700">4 pets</p>
    </div>
  );
};

const VetOverviewDateItem = () => {
  return (
    <motion.div className="flex justify-between gap-2 rounded-xl p-1">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendar} />
        <div>
          <h3 className="text-lg font-medium">Date with Andres</h3>
          <p className="text-sm text-blue-gray-400">
            <span className="font-medium">34 Sep 2023</span>
            <span> (3 days ago)</span>
          </p>
        </div>
      </div>
      <div>img customer</div>
    </motion.div>
  );
};

function parsearFecha(cadenaFecha) {
	var fecha = new Date(cadenaFecha);
	var año = fecha.getFullYear();
	var mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que se suma 1
	var dia = fecha.getDate();
  
	return año + "-" + mes + "-" + dia;
  }

const VetOverviewCard = () => {
  const { customers, pets, visits } = useCustomers();
  console.log({ visits })
  return (
    <Fragment>
      <VetOverviewLayout title="Pets">
        {pets?.map((pet, index) => {
          let parseImage = `data:image/png;base64, ${pet.pet_pic}`;
          return (
            <VetOverviewPetsItem
              pet={pet}
              key={index}
              image={parseImage}
              key={index}
            />
          );
        })}
      </VetOverviewLayout>
      <VetOverviewLayout title="Customers">
        {customers?.map((customer, index) => {
          let parseImage = `data:image/png;base64, ${customer.userDetails.profile_pic}`;
          return (
            <VetOverviewCustomerItem
              customer={customer}
              key={index}
              image={parseImage}
            />
          );
        })}
      </VetOverviewLayout>
      <VetOverviewLayout title="Dates">
		{visits?.map((visit, index) => {
				return(
					<div className="flex gap-3 items-center">
						<FontAwesomeIcon icon={faCalendar} className="text-2xl text-happy-blue"/>
						<div className="flex flex-col">
						<p>Appointment date:</p>
						<h2 className="text-sm">{parsearFecha(visit.date)}</h2>
					</div>
					</div>
					
				)
		})}
        
      </VetOverviewLayout>
    </Fragment>
  );
};

export default VetOverviewCard;
