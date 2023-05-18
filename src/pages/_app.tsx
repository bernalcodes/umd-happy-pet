import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import CustomersProvider from "@/context/CustomersContext";
import UserProvider from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CustomersProvider>
          <Component {...pageProps} />
        </CustomersProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
