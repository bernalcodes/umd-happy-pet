import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar, Input, ThemeProvider } from "@material-tailwind/react";
import AccordionPetForm from "../AccordionPetForm/AccordionPetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons/faCircleMinus";
import { SubmitHandler, useForm } from "react-hook-form";

const customTheme: object = {
  component: {
    defaultProps: {
      minWidth: "0px !important",
    },
    valid: {},
    styles: {
      base: {
        container: {
          minWidth: 0,
        },
      },
    },
  },
};
export default function ModalAddCustomer({
  open,
  closeAddCustomer,
}: {
  open: boolean;
  closeAddCustomer: () => void;
}) {
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    address: "",
    email: "",
    last_name: "",
    name: "",
    pet_list: [],
    phone_number: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  const handleOpen = (value: number): void => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  const handleAddPet = (newPet: Pet, idPet: string): void => {
    console.log("entro aqui");
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

  const onSubmit: SubmitHandler<Customer> = () => {
    console.log(newCustomer);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddCustomer}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={closeAddCustomer}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="flex w-full flex-col">
                    <form
                      className="sm:col-span-8 lg:col-span-7"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <h2 className="mb-6 text-2xl font-semibold text-gray-900 sm:pr-12">
                        Add customer
                      </h2>
                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
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
                        <div className="mt-3 flex flex-col gap-3">
                          <AccordionPetForm
                            id={1}
                            register={register}
                            handleAddPet={handleAddPet}
                            handleOpen={() => handleOpen(1)}
                            open={openAccordion}
                            errors={errors}
                          />
                        </div>
                      </section>
                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <div>
                          {/* Pet list */}
                          <div>
                            <h4 className="mb-2 text-lg font-medium text-gray-900">
                              Pet list
                            </h4>
                            <div className="flex w-full gap-4 overflow-x-scroll">
                              {newCustomer.pet_list.length === 0 && (
                                <p className="text-gray-500">
                                  Add at least one pet
                                </p>
                              )}
                              {newCustomer.pet_list.map(
                                (pet: Pet, index: number) => (
                                  <div
                                    key={index}
                                    className="flex min-w-fit items-center justify-between gap-2 rounded-full bg-[#aba9f7] p-2"
                                  >
                                    <Avatar
                                      src="https://placeimg.com/200/200/any"
                                      variant="circular"
                                      alt="avatar"
                                      size="xs"
                                    />
                                    <p>{pet.name}</p>
                                    <button
                                      onClick={(event) =>
                                        handleDeletePet(event, pet.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCircleMinus}
                                        className="cursor-pointer text-2xl text-white hover:text-blue-gray-200"
                                      />
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        </div>
                      </section>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
