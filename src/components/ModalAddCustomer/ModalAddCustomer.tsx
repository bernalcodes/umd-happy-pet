import React, { Fragment, useState } from "react";

import { Avatar, Input } from "@material-tailwind/react";
import AccordionPetForm from "../AccordionPetForm/AccordionPetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons/faCircleMinus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { useCustomer } from "@/context/UserContext";
import { useCustomers } from "@/context/CustomersContext";

const initialCustomer: Customer = {
  address: "",
  email: "",
  last_name: "",
  name: "",
  pet_list: [],
  phone_number: "",
};

export default function ModalAddCustomer({ closeModal }): JSX.Element {
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [newCustomer, setNewCustomer] = useState<Customer>(initialCustomer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  const { vetAddCustomer, createUser } = useFetch();
  const { handleRefreshUsers } = useCustomers();

  const handleOpen = (value: number): void => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  const handleAddPet = (newPet: Pet, idPet: string): void => {
    setNewCustomer({
      ...newCustomer,
      pet_list: [...newCustomer.pet_list, { ...newPet, id: idPet }],
    });
  };

  const handleDeletePet = (
    event: React.MouseEvent<HTMLButtonElement>,
    idPet: string
  ): void => {
    event.preventDefault();
    const newPetsList: Pet[] = newCustomer.pet_list.filter(
      (pet: Pet): boolean => pet.id !== idPet
    );
    setNewCustomer({ ...newCustomer, pet_list: newPetsList });
  };

  const handleChangeCustomer = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const onSubmit: SubmitHandler<Customer> = async () => {
    console.log({ newCustomer });
    // @ts-ignore
    const customerCreated = await vetAddCustomer(newCustomer, "CUSTOMER");
    if (customerCreated?.success) {
      console.log({ customerCreated });
      handleRefreshUsers();
      closeModal();
    } else {
      const error = JSON.parse(customerCreated?.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex w-full flex-col">
        <form
          className="sm:col-span-8 lg:col-span-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 sm:pr-12">
            Add customer
          </h2>
          <section aria-labelledby="information-heading" className="mt-2">
            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 ">
                <Input
                  label="Name"
                  {...register("name", { required: true })}
                  onChange={handleChangeCustomer}
                />
                <Input
                  label="Last name"
                  {...register("last_name", { required: true })}
                  onChange={handleChangeCustomer}
                />
                <Input
                  label="Phone number"
                  {...register("phone_number", {
                    required: true,
                  })}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  label="Email"
                  {...register("email", { required: true })}
                  onChange={handleChangeCustomer}
                />
                <Input
                  label="Address"
                  {...register("address", { required: true })}
                  onChange={handleChangeCustomer}
                />
              </div>
            </div>
            {/* New pet */}
            {/*<div className="mt-3 flex flex-col gap-3">*/}
            {/*  <AccordionPetForm*/}
            {/*    id={1}*/}
            {/*    register={register}*/}
            {/*    handleAddPet={handleAddPet}*/}
            {/*    handleOpen={() => handleOpen(1)}*/}
            {/*    open={openAccordion}*/}
            {/*    errors={errors}*/}
            {/*  />*/}
            {/*</div>*/}
          </section>
          <section aria-labelledby="options-heading" className="mt-10">
            <div>
              {/* Pet list */}
              {/*<div>*/}
              {/*  <h4 className="mb-2 text-lg font-medium text-gray-900">*/}
              {/*    Pet list*/}
              {/*  </h4>*/}
              {/*  <div className="flex w-full gap-4 overflow-x-auto">*/}
              {/*    {newCustomer.pet_list.length === 0 && (*/}
              {/*      <p className="text-gray-500">Add at least one pet</p>*/}
              {/*    )}*/}
              {/*    {newCustomer.pet_list.map((pet: Pet, index: number) => (*/}
              {/*      <div*/}
              {/*        key={index}*/}
              {/*        className="flex min-w-fit items-center justify-between gap-2 rounded-full bg-[#aba9f7] p-2"*/}
              {/*      >*/}
              {/*        <Avatar*/}
              {/*          // @ts-ignore*/}
              {/*          src={pet.img}*/}
              {/*          variant="circular"*/}
              {/*          alt="avatar"*/}
              {/*          size="xs"*/}
              {/*        />*/}
              {/*        <p>{pet.name}</p>*/}
              {/*        <button*/}
              {/*          onClick={(event) => handleDeletePet(event, pet.id)}*/}
              {/*        >*/}
              {/*          <FontAwesomeIcon*/}
              {/*            icon={faCircleMinus}*/}
              {/*            className="cursor-pointer text-2xl text-white hover:text-blue-gray-200"*/}
              {/*          />*/}
              {/*        </button>*/}
              {/*      </div>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</div>*/}
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-happy-color-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add customer
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
