import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
} from "@material-tailwind/react";
 
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
 
export default function AccordionPetForm({ id , handleOpen, open }: { id: number, handleOpen: (value: number) => void, open: number}) {
    //const [open, setOpen] = useState(0);
 
    //   const handleOpen = (value: number) => {
    //     setOpen(open === value ? 0 : value);
    //   };
 
  return (
    <Fragment>
      <Accordion open={open === id}>
        <AccordionHeader onClick={() => handleOpen(id)} className="border-none border-transparent hover:bg-blue-gray-50 rounded-xl hover:px-4 transition-all">
          Add new pet
        </AccordionHeader>
        <AccordionBody>
          <div className="flex flex-col gap-3">
            <div className='flex gap-3'>
                <Input label='Pet name'/>
                <Input label='Age'/>
            </div>
            <div className='flex gap-3'>
                <Input label='Breed'/>
                <button className="normal-case bg-happy-color-primary whitespace-nowrap px-6 py-2 rounded-lg text-white hover:bg-happy-color-primary-light transition-colors">Add pet</button>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}