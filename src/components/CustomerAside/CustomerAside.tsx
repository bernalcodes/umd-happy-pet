import { faCalendar, faChartPie, faDog, faGear, faHome, faPaw, faUserNurse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ItemAside from "../ItemAside/ItemAside";

const CustomerAside = () => {
	return (
		<aside className="w-80 bg-white h-screen py-8 px-8 flex flex-col gap-6 shadow-md">
			<div className="flex flex-col gap-5">
				<div className="w-14 h-14 bg-rose-300 rounded-full"></div>
				<div className="flex gap-2 rounded-lg bg-happy-color-primary-light px-3 py-2 items-center">
					<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
						<FontAwesomeIcon icon={faPaw} className="text-xl" />
					</div>
					<div className="flex flex-col">
						<h2 className="font-semibold">My Business</h2>
						<p>Admin</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div>
					<h3 className="text-slate-400 mb-3">ANALYTICS</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faPaw} label="Home"/>
						<ItemAside icon={faChartPie} label="Reports"/>
					</div>
				</div>
				<div>
					<h3 className="text-slate-400 mb-3">BASE</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faUserNurse} label="Profile"/>
						<ItemAside icon={faUsers} label="Customers"/>
						<ItemAside icon={faDog} label="Pets"/>
					</div>
				</div>
				<div>
					<h3 className="text-slate-400 mb-3">OTHERS</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faCalendar} label="Calendar"/>
						<ItemAside icon={faGear} label="Settings"/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default CustomerAside;
