import React, { ChangeEvent, useState } from "react";
import { Input } from "@material-tailwind/react";
import { v4 as uuid } from "uuid";
import { useCustomers } from "@/context/CustomersContext";

const initialPet: Pet = {
  age: "",
  id: "",
  breed: "",
  img: "",
  name: "",
};

export default function ModalAddPet(): JSX.Element {
  const [newPet, setNewPet] = useState<Pet>(initialPet);
  const { customers } = useCustomers();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader: FileReader = new FileReader();
    if (e.target && e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        e.preventDefault();
        // @ts-ignore
        setNewPet({ ...newPet, img: e.target.result });
      };
    }
  };

  const handleAddPet = (newPet: Pet, idPet: string) => {};

  return (
    <>
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 sm:pr-12">
          Add new pet
        </h2>
        <div className="flex gap-3">
          <label
            htmlFor="imagepet"
            style={{ backgroundImage: `url(${newPet.img})` }}
            className={`flex w-32 cursor-pointer items-center justify-center rounded-xl ${
              newPet.img === ""
                ? "border-2 border-dashed border-blue-gray-300"
                : ""
            } bg-cover bg-center`}
          >
            {newPet.img === "" && "Add image"}
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            id="imagepet"
            className="flex hidden w-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-gray-300"
          />
          <div className="flex w-full flex-col gap-3">
            <div className="flex gap-3">
              <Input
                label="Pet name"
                name="name"
                value={newPet.name}
                onChange={handleChange}
              />
              <Input
                label="Age"
                name="age"
                value={newPet.age}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <Input label="Breed" name="breed" onChange={handleChange} />
              <button
                onClick={() => {
                  handleAddPet(newPet, uuid());
                }}
                disabled={
                  newPet.name === "" || newPet.age === "" || newPet.breed === ""
                }
                className="whitespace-nowrap rounded-lg bg-happy-color-primary px-6 py-2 normal-case text-white transition-colors hover:bg-happy-color-primary-light"
              >
                Add pet
              </button>
              <button
                onClick={() => setNewPet(initialPet)}
                className="whitespace-nowrap rounded-lg bg-happy-color-primary px-6 py-2 normal-case text-white transition-colors hover:bg-happy-color-primary-light"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3>Assign new owner</h3>
          <div>
            {customers.map((customer, index) => (
              <div key={index}>
                <h2>{customer.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
