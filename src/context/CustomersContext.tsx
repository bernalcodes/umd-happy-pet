import React, { Context, createContext, useContext } from "react";

export interface CustomersDataContext {
  customers: Customer[];
}

const initialCustomersDataContext: CustomersDataContext = {
  customers: [],
};

const CustomersContext: Context<CustomersDataContext> =
  createContext<CustomersDataContext>(initialCustomersDataContext);

export const useCustomers = (): CustomersDataContext =>
  useContext(CustomersContext);

const CustomersProvider = ({ children }: { children: React.ReactNode }) => {
  const customers: Customer[] = [
    {
      name: "Andres",
      last_name: "Sanabria",
      pet_list: [],
      phone_number: "12334545",
      email: "john@due.com",
      address: "Kr 11 e 21 23",
    },
  ];

  return (
    <CustomersContext.Provider value={{ customers }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
//@ts-ignore
