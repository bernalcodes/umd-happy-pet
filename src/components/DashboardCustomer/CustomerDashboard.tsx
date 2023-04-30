import React from "react";
import CustomerNavbar from "../CustomerNavbar/CustomerNavbar";
import CustomerAside from "../CustomerAside/CustomerAside";

const CustomerDashboard = () => {
  return (
    <div className="flex flex-row bg-happy-grey-blue">
      <CustomerAside />
      <div className="h-fit w-full">
        <CustomerNavbar />
      </div>
    </div>
  );
};

export default CustomerDashboard;
