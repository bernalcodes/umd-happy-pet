import { ChangeEvent, Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { v4 as uuid } from "uuid";

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

export default function AccordionPetForm({
  id,
  handleOpen,
  open,
  handleAddPet,
}: {
  id: number;
  handleOpen: (value: number) => void;
  open: number;
  handleAddPet: (newPet: Pet, idPet: string) => void;
}) {
  const [newPet, setNewPet] = useState<Pet>({
    id: "",
    age: 0,
    breed: "",
    img: "",
    name: "",
    owner: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
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
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Input label="Pet name" onChange={handleChange} name="name" />
              <Input label="Age" name="age" onChange={handleChange} />
            </div>
            <div className="flex gap-3">
              <Input label="Breed" name="breed" onChange={handleChange} />
              <button
                onClick={() => {
                  handleAddPet(newPet, uuid());
                }}
                className="whitespace-nowrap rounded-lg bg-happy-color-primary px-6 py-2 normal-case text-white transition-colors hover:bg-happy-color-primary-light"
              >
                Add pet
              </button>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
