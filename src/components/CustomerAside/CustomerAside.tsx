import { faCalendar, faChartPie, faDog, faGear, faHome, faPaw, faUserNurse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ItemAside from "../ItemAside/ItemAside";

const CustomerAside = () => {
	return (
		<aside className="w-72 bg-white h-screen py-8 px-8 flex flex-col gap-6 shadow-md">
			<div className="flex flex-col gap-3">
				<div>
					<h3 className="text-slate-400 mb-3 text-">ANALYTICS</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faPaw} label="Home"/>
						<ItemAside icon={faChartPie} label="Reports"/>
					</div>
				</div>
				<div>
					<h3 className="text-slate-400 mb-3">BASE</h3>
					<div className="items flex flex-col gap-3">
						<ItemAside icon={faUserNurse} label="Profile"/>
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
