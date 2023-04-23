import { faCalendar, faChartPie, faDog, faGear, faHome, faPaw, faUserNurse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ItemAside from "../ItemAside/ItemAside";

const VetAside = () => {
	return (
		<aside className="w-72 bg-white h-screen py-8 px-8 flex flex-col gap-6 shadow-md">
			<div className="flex flex-col gap-5">
				<div className="flex gap-2 rounded-xl bg-happy-color-primary-light px-4 py-3 items-center">
					<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
						<FontAwesomeIcon icon={faPaw} className="text-xl" />
					</div>
					<div className="flex flex-col">
						<h2 className="font-semibold text-sm">My Business</h2>
						<p>Admin</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<h3 className="text-blue-gray-400 mb-3 text-">ANALYTICS</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faPaw} label="Home"/>
						<ItemAside icon={faChartPie} label="Reports"/>
					</div>
				</div>
				<div>
					<h3 className="text-blue-gray-400 mb-3">BASE</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faUserNurse} label="Profile"/>
						<ItemAside icon={faUsers} label="Customers"/>
						<ItemAside icon={faDog} label="Pets"/>
					</div>
				</div>
				<div>
					<h3 className="text-blue-gray-400 mb-3">OTHERS</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faCalendar} label="Calendar"/>
						<ItemAside icon={faGear} label="Settings"/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default VetAside;
