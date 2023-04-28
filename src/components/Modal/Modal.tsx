import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import SelectPet from "../SelectPet/SelectPet";
import Image from "next/image";

export default function ModalAddCustomer({
	open,
	closeAddCustomer,
}: {
	open: boolean;
	closeAddCustomer: () => void;
}) {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={closeAddCustomer}
			>
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
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>

									<div className="">
										<div className="">
											<p>Add Customer</p>
										</div>
										<div className="flex gap-3 w-full">
											<div className="img w-1/4">
												<Image
													src="https://placeimg.com/640/480/any"
													width="200"
													height="200"
													alt="image"
                          className="bg-cover w-full h-full"
												/>
											</div>
											<div className="w-9/12">
												<form
													className="mt-8 space-y-6"
													action="#"
													method="POST"
												>
													<div className="-space-y-px rounded-md shadow-sm">
														<div className="flex flex-col gap-3">
															<div className="flex gap-3 flex-wrap">
																<Input label="Name" />
																<Input label="Phone number" />
															</div>
															<div className="flex gap-3 flex-wrap">
																<Input label="Address" />
																<div className="w-8">
																	<SelectPet />
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
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
