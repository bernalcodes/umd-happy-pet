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
  refreshAuth: any;
}

const initialCustomersDataContext: UserProvider = {
  user: {},
  setUser: () => {},
  authData: {},
  refreshAuth: () => {},
};

const UserContext: Context<UserProvider> = createContext<UserProvider>(
  initialCustomersDataContext
);

export const useCustomer = (): UserProvider => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { login, getUser } = useFetch();

  const refreshAuth = () => {
    setRefresh(!refresh);
  };

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
  }, [refresh]);

  return (
    <UserContext.Provider value={{ user, setUser, authData, refreshAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
//@ts-ignore
