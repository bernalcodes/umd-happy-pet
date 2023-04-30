import {
  faCalendar,
  faChartPie,
  faDog,
  faGear,
  faHome,
  faPaw,
  faUserNurse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ItemAside from "../ItemAside/ItemAside";

const VetAside = () => {
  return (
    <aside className="flex h-screen w-72 flex-col gap-6 bg-white px-8 py-8 shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 rounded-xl bg-happy-color-primary-light px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <FontAwesomeIcon icon={faPaw} className="text-xl" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">My Business</h2>
            <p>Admin</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text- mb-3 text-blue-gray-400">ANALYTICS</h3>
          <div className="items flex flex-col gap-3">
            <ItemAside icon={faPaw} label="Home" />
            <ItemAside icon={faChartPie} label="Reports" />
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-blue-gray-400">BASE</h3>
          <div className="items flex flex-col gap-3">
            <ItemAside icon={faUserNurse} label="Profile" />
            <ItemAside icon={faUsers} label="Customers" />
            <ItemAside icon={faDog} label="Pets" />
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-blue-gray-400">OTHERS</h3>
          <div className="items flex flex-col gap-3">
            <ItemAside icon={faCalendar} label="Calendar" />
            <ItemAside icon={faGear} label="Settings" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default VetAside;
