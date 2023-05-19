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
  pets: any;
}

const initialCustomersDataContext: CustomersDataContext = {
  customers: [],
  handleRefreshUsers: () => {},
  pets: [],
};

const CustomersContext: Context<CustomersDataContext> =
  createContext<CustomersDataContext>(initialCustomersDataContext);

export const useCustomers = (): CustomersDataContext =>
  useContext(CustomersContext);

const CustomersProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);
  const [refreshListUsers, setRefreshListUsers] = useState(false);
  const { user, authData } = useCustomer();
  const { getAllUsers, getAllPets } = useFetch();

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
        const petsList = await getAllPets(user.id, authData.Authorization);
        if (petsList?.success) {
          //@ts-ignore
          setPets(petsList?.data.petList);
        } else {
          //@ts-ignore
          const error = JSON.parse(petsList?.message);
          console.log(error);
        }
      }
    };
    getUsers();
  }, [user, refreshListUsers]);

  return (
    <CustomersContext.Provider value={{ customers, pets, handleRefreshUsers }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
//@ts-ignore
