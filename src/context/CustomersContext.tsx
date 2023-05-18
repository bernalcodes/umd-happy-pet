import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCustomer } from "@/context/UserContext";
import { useFetch } from "@/hooks/useFetch";

export interface CustomersDataContext {
  customers: any;
  handleRefreshUsers: any;
}

const initialCustomersDataContext: CustomersDataContext = {
  customers: [],
  handleRefreshUsers: () => {},
};

const CustomersContext: Context<CustomersDataContext> =
  createContext<CustomersDataContext>(initialCustomersDataContext);

export const useCustomers = (): CustomersDataContext =>
  useContext(CustomersContext);

const CustomersProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState([]);
  const [refreshListUsers, setRefreshListUsers] = useState(false);
  const { user, authData } = useCustomer();
  const { getAllUsers } = useFetch();

  const handleRefreshUsers = () => {
    setRefreshListUsers(!refreshListUsers);
  };

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        const userList = await getAllUsers(authData?.Authorization);
        console.log({ userList });
        if (userList?.success) {
          setCustomers(userList?.data);
        } else {
          //@ts-ignore
          const error = JSON.parse(userList?.message);
          console.log(error);
        }
      }
    };
    getUsers();
  }, [user, refreshListUsers]);

  return (
    <CustomersContext.Provider value={{ customers, handleRefreshUsers }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
//@ts-ignore
