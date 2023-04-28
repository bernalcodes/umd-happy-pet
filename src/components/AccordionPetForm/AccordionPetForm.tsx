import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
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
        <AccordionHeader onClick={() => handleOpen(id)}>
          Add new pet
        </AccordionHeader>
        <AccordionBody>
        <div className='flex gap-3'>
            <Input label='Pet'/>
            <Input label='Breed'/>
        </div>
        <div className='flex gap-3'>
            <Input label='Age'/>
            <Input label='Weight'/>
        </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}