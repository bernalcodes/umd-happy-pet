import React, { ChangeEvent, useState } from "react";
import users from "../../data/users.json" assert { type: "JSON" };
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { DotPulse } from "@uiball/loaders";
import { useCustomers } from "@/context/CustomersContext";
import { useFetch } from "@/hooks/useFetch";
import { useCustomer } from "@/context/UserContext";
export const ModalCreateDate = () => {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [creatingDateLoader, setCreatingDateLoader] = useState(false);
  const [dateCreated, setDateCreated] = useState(false);
  const [petsPerCustomer, setPetsPerCustomer] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [date, setDate] = useState("");

  const { customers, pets, handleRefreshUsers } = useCustomers();
  const { authData } = useCustomer();
  const { user } = useCustomer();
  const { createDate } = useFetch();

  const handleSearchCustomer = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = customers.filter((user) => {
    const fullName = `${user.personDetails.name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const handleClickCustomer = (customer) => {
    const petsFilter = pets.filter((pet) => pet.owner_id === customer.personDetails.id);
    setPetsPerCustomer(petsFilter);
    console.log(customer);
    setSelectedCustomer(customer);
    console.log({ date, petsFilter });
  };

  const handleCreateDate = async () => {
    setCreatingDateLoader(true);

    try {
      const visitCreated = await createDate(authData.Authorization, {
        id_pet: selectedPet?.id,
        date: date,
      });
	  setDateCreated(true);
      console.log({ visitCreated });
	  handleRefreshUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setCreatingDateLoader(false);
    }
  };

  return (
    <div className="min-w-[375px] p-3">
      <h2 className="mb-4 text-center text-xl font-bold">Create New Date</h2>
      <div className="flex w-full gap-2">
        <input
          type="datetime-local"
          name="date"
          id="date"
          className="w-full  rounded-xl border-2 border-solid border-blue-gray-400 p-2 outline-none focus:border-happy-blue"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className={`button-style-primary flex items-center gap-3 !p-2 !px-5 ${
            dateCreated ? "gap-2 !bg-happy-green" : ""
          }`}
          onClick={handleCreateDate}
        >
          {creatingDateLoader && (
            <DotPulse size={20} speed={1.3} color="white" />
          )}
          {dateCreated && (
            <FontAwesomeIcon icon={faCircleCheck} className="text-[18px]" />
          )}
          <p>{dateCreated ? "Done!" : "Confirm"}</p>
        </button>
      </div>
      {selectedCustomer ? (
        <div
          key={selectedCustomer}
          className="mt-4 flex w-full flex-col gap-3 rounded-xl bg-blue-gray-50 p-2"
        >
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Image
                src={`data:image/png;base64, ${selectedCustomer?.userDetails.profile_pic}`}
                className="h-9 w-9 rounded-xl shadow-md"
                height={200}
                width={200}
                alt="any"
              />
            </div>
            <h3 className="text-lg font-bold">{selectedCustomer?.personDetails.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {petsPerCustomer.map((pet, index) => (
              <div
                className=" cursor-pointer rounded-full bg-happy-blue px-3 py-[3px] text-white"
                key={index}
                onClick={() => setSelectedPet(pet)}
              >
                {pet.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex w-full items-center gap-3 rounded-xl bg-blue-gray-50 p-2">
          No customer selected
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 px-3">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          className="w-full rounded-xl border-2 border-solid border-gray-300 p-2 outline-none focus:border-happy-blue"
          placeholder="Search customer..."
          value={search}
          onChange={handleSearchCustomer}
        />
      </div>
      <div className="mt-4 max-h-[300px] overflow-y-auto">
        {filteredCustomers.map((customer, index) => (
          <div
            key={index}
            onClick={() => handleClickCustomer(customer)}
            className="cursor-pointer rounded-xl p-3 hover:bg-happy-light-blue"
          >
            <div className="flex items-center gap-2">
              <Image
                src={`data:image/png;base64, ${customer.userDetails.profile_pic}`}
                className="h-11 w-11 rounded-xl shadow-md"
                height={200}
                width={200}
                alt="any"
              />
              <div className="flex flex-col">
                <h2>{customer.personDetails.name}</h2>
                <div className="text-sm text-blue-gray-400">
                  {customer.userDetails.email}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
