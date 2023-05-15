import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import CustomersProvider from "@/context/CustomersContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CustomersProvider>
        <Component {...pageProps} />
      </CustomersProvider>
    </ThemeProvider>
  );
}
