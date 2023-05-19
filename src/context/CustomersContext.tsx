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
  visits: any
  pets: any;
}

const initialCustomersDataContext: CustomersDataContext = {
  customers: [],
  handleRefreshUsers: () => {},
  visits: [],
  pets: [],
};

const CustomersContext: Context<CustomersDataContext> =
  createContext<CustomersDataContext>(initialCustomersDataContext);

export const useCustomers = (): CustomersDataContext =>
  useContext(CustomersContext);

const CustomersProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);
  const [visits, setVisits] = useState([]);
  const [refreshListUsers, setRefreshListUsers] = useState(false);
  const { user, authData } = useCustomer();
  const { getAllUsers, getAllPets, getAllVisits } = useFetch();

  const handleRefreshUsers = () => {
    setRefreshListUsers(!refreshListUsers);
  };

  useEffect(() => {
    const getUsers = async () => {

		console.log({usersss: user})
      if (user) {
        const userList = await getAllUsers(authData?.Authorization);
        if (userList?.success) {
          setCustomers(userList?.data);
        } else {
          //@ts-ignore
          const error = JSON.parse(userList?.message);
          console.log(error);
        }
        const petsList = await getAllPets(user.userDetails.id, authData.Authorization);
        if (petsList?.success) {
          //@ts-ignore
          setPets(petsList?.data);
        } else {
          //@ts-ignore
          const error = JSON?.parse(petsList?.message);
          console.log(error);
        }
		const listVisits = await getAllVisits(authData.Authorization);
		if (listVisits?.success) {
			//@ts-ignore
			setVisits(listVisits?.data);
		  } else {
			//@ts-ignore
			const error = JSON?.parse(listVisits?.message);
			console.log(error);
		  }
      }
    };
    getUsers();
  }, [user, refreshListUsers]);

  return (
    <CustomersContext.Provider value={{ customers, pets, handleRefreshUsers, visits }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
//@ts-ignore
