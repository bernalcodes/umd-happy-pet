import React from "react";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const LayoutHome: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default LayoutHome;
