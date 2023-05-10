import React from "react";
import VetOverview from "../VetOverview/VetOverview";
import { useModal } from "@/hooks/useModal";
import Aside from "../Aside/Aside";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import VetOverviewCard from "../VetOverviewCard/VetOverviewCard";
import Modal from "../Modal/Modal";
import ModalAddCustomer from "../ModalAddCustomer/ModalAddCustomer";
import ModalAddPet from "@/components/ModalAddPet/ModalAddPet";

const VetDashboard = () => {
  const [isOpenAddCustomer, openAddCustomer, closeAddCustomer] =
    useModal(false);
  const [isOpenMenu, openMenu, closeMenu] = useModal(false);
  const [isOpenAddPet, openAddPet, closeAddPet] = useModal(false);

  return (
    <div className="flex flex-row bg-happy-grey-blue">
      <Modal open={isOpenAddCustomer} closeModal={closeAddCustomer}>
        <ModalAddCustomer />
      </Modal>
      <Modal open={isOpenAddPet} closeModal={closeAddPet}>
        <ModalAddPet />
      </Modal>

      <Aside open={isOpenMenu} closeMenu={closeMenu} />
      <div className="h-screen w-full">
        <NavbarDashboard openMenu={openMenu} />
        <VetOverview />
        <div className="h-full  rounded-t-3xl py-2">
          <div className=" m-auto max-w-screen-2xl px-5">
            <div className="flex items-end justify-between px-3 py-6">
              <h2 className="text-xl font-semibold md:text-2xl">Hi, Andres</h2>
              <div className="flex gap-3">
                <button
                  onClick={openAddCustomer}
                  className="flex items-center gap-2 rounded-md border border-solid border-transparent bg-happy-color-primary px-4 py-[6px] text-white transition-colors hover:border-happy-color-primary hover:bg-happy-color-primary-light"
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                  <p className="text-base md:text-lg">Add Customer</p>
                </button>
                <button
                  onClick={openAddPet}
                  className="flex items-center gap-2 rounded-md border border-solid border-transparent bg-happy-color-primary px-4 py-[6px] text-white transition-colors hover:border-happy-color-primary hover:bg-happy-color-primary-light"
                >
                  Add Pet
                </button>
              </div>
            </div>
            <div className="overviews flex gap-6">
              <VetOverviewCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;
