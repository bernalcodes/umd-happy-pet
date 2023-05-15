import { ChangeEvent, ChangeEventHandler, Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { v4 as uuid } from "uuid";
import { FieldErrors, UseFormRegister } from "react-hook-form";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const initialPet: Pet = {
  age: "",
  id: "",
  breed: "",
  img: "",
  name: "",
};

export default function AccordionPetForm({
  id,
  handleOpen,
  open,
  handleAddPet,
  register,
  errors,
}: {
  id: number;
  handleOpen: (value: number) => void;
  open: number;
  handleAddPet: (newPet: Pet, idPet: string) => void;
  register: UseFormRegister<Customer>;
  errors: FieldErrors<Customer>;
}) {
  const [newPet, setNewPet] = useState<Pet>(initialPet);

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

  return (
    <Fragment>
      <Accordion open={open === id}>
        <AccordionHeader
          onClick={() => handleOpen(id)}
          className="rounded-xl border-none border-transparent transition-all hover:bg-blue-gray-50 hover:px-4"
        >
          Add new pet
        </AccordionHeader>
        <AccordionBody>
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
                    newPet.name === "" ||
                    newPet.age === "" ||
                    newPet.breed === ""
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
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
