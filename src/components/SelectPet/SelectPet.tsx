import { Select, Option } from "@material-tailwind/react";

export default function SelectPet() {
  return (
    <Select
      label="Select type Pet"
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <Option>Dog</Option>
      <Option>Cat</Option>
      <Option>Bird</Option>
      <Option>Octopus</Option>
      <Option>Elephant</Option>
    </Select>
  );
}
