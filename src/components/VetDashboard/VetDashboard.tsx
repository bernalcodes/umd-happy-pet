import React from "react";
import VetOverview from "../VetOverview/VetOverview";
import { useModal } from "@/hooks/useModal";
import ModalAddCustomer from "../Modal/Modal";
import Aside from "../Aside/Aside";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import VetOverviewCard from "../VetOverviewCard/VetOverviewCard";

const VetDashboard = () => {
	const [isOpenAddCustomer, openAddCustomer, closeAddCustomer] =
		useModal(false);
	const [isOpenMenu, openMenu, closeMenu] = useModal(false);

	return (
		<div className="flex flex-row bg-happy-grey-blue">
			<ModalAddCustomer
				open={isOpenAddCustomer}
				closeAddCustomer={closeAddCustomer}
			/>
			<Aside open={isOpenMenu} closeMenu={closeMenu} />
			<div className="w-full h-screen">
				<NavbarDashboard openMenu={openMenu} />
				<VetOverview />
				<div className="py-2  rounded-t-3xl h-full">
					<div className=" max-w-screen-2xl m-auto px-5">
						<div className="flex justify-between px-3 py-6 items-end">
							<h2 className="md:text-2xl text-xl font-semibold">
								Hi, Andres
							</h2>
							<div className="flex gap-3">
								<button
									onClick={openAddCustomer}
									className="flex gap-2 items-center bg-happy-color-primary hover:bg-happy-color-primary-light py-[6px] px-4 rounded-md border border-solid border-transparent hover:border-happy-color-primary text-white transition-colors"
								>
									<FontAwesomeIcon icon={faCirclePlus} />
									<p className="md:text-lg text-base">
										Add Pet
									</p>
								</button>
								<button
									onClick={openAddCustomer}
									className="flex gap-2 items-center bg-happy-color-primary hover:bg-happy-color-primary-light py-[6px] px-4 rounded-md border border-solid border-transparent hover:border-happy-color-primary text-white transition-colors"
								>
									<FontAwesomeIcon icon={faCirclePlus} />
									<p className="md:text-lg text-base">
										Add Customer
									</p>
								</button>
							</div>
						</div>
            <div className="overviews flex gap-6">
              <VetOverviewCard/>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VetDashboard;
