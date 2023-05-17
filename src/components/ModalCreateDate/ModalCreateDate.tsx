import React, { ChangeEvent, useState } from "react";
import users from "../../data/users.json" assert { type: "JSON" };
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { DotPulse } from "@uiball/loaders";
export const ModalCreateDate = () => {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [creatingDateLoader, setCreatingDateLoader] = useState(false);
  const [dateCreated, setDateCreated] = useState(false);

  const handleSearchCustomer = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const handleClickCustomer = (customer) => {
    setSelectedCustomer(customer);
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
        />
        <button
          className={`button-style-primary flex items-center gap-3 !p-2 !px-5 ${
            dateCreated ? "gap-2 !bg-happy-green" : ""
          }`}
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
          className="mt-4 flex w-full items-center gap-3 rounded-xl bg-blue-gray-50 p-2"
        >
          <div>
            <Image
              src={selectedCustomer?.image}
              className="h-9 w-9 rounded-xl shadow-md"
              height={200}
              width={200}
              alt="any"
            />
          </div>
          <h3 className="text-lg font-bold">{selectedCustomer?.firstName}</h3>
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
                src={customer.image}
                className="h-11 w-11 rounded-xl shadow-md"
                height={200}
                width={200}
                alt="any"
              />
              <div className="flex flex-col">
                <h2>{customer.firstName}</h2>
                <div className="text-sm text-blue-gray-400">
                  {customer.email}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
