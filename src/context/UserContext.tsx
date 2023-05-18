import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "@/hooks/useFetch";

export interface UserProvider {
  user: any;
  setUser: any;
  authData: any;
}

const initialCustomersDataContext: UserProvider = {
  user: {},
  setUser: () => {},
  authData: {},
};

const UserContext: Context<UserProvider> = createContext<UserProvider>(
  initialCustomersDataContext
);

export const useCustomer = (): UserProvider => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const { login, getUser } = useFetch();

  useEffect(() => {
    const detectUser = async () => {
      if (localStorage.getItem("auth-token")) {
        const dataLS = JSON.parse(localStorage.getItem("auth-token") ?? "");
        setAuthData(dataLS);

        console.log({ dataLS });
        const userInfo = await getUser(dataLS?.id, dataLS?.Authorization);
        console.log({ userInfo: userInfo });
        if (userInfo?.success) {
          setUser(userInfo.data);
        }
      }
    };
    detectUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, authData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
//@ts-ignore
