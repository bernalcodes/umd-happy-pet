import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PowerIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
	Avatar,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from "@material-tailwind/react";
import React from "react";

const MenuUser = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

	return (
		<div className="hidden lg:flex gap-2">
			<Menu placement="bottom-end" open={isMenuOpen} handler={setIsMenuOpen}>
				<MenuHandler>
					<Button
						variant="text"
						color="blue-gray"
						className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
					>
						<Avatar
							variant="circular"
							size="sm"
							alt="candice wu"
							className="border border-blue-500 p-0.5"
							src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
						/>
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`h-3 w-3 transition-transform ${
								isMenuOpen ? "rotate-180" : ""
							}`}
						/>
					</Button>
				</MenuHandler>
				<MenuList className="!mt-3">
					<MenuItem>
						<div className="flex gap-2 items-center">
							<PowerIcon className="w-4 h-4" strokeWidth={2} />
							<span>Sign out</span>
						</div>
					</MenuItem>
				</MenuList>
			</Menu>
		</div>
	);
};

export default MenuUser;
