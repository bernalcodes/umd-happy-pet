import React, { useState } from "react";
import Loader from "../Loader/Loader";

const LayoutAuth = ({
  children,
  isLogin,
}: {
  children: React.ReactNode;
  isLogin?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen w-full flex-col md:flex-row">
          <div className="flex h-full w-full items-center justify-center">
            {children}
          </div>
          <div
            className={`bg-slate-300 hidden w-full md:flex ${
              isLogin ? "bg-hero-login" : "bg-hero-signup"
            } items-center justify-center bg-cover bg-center`}
          >
            <h1
              className={`flex text-6xl font-bold ${
                isLogin ? "mb-0 mt-56" : "mb-56"
              }`}
            >
              <p className="text-happy-color-primary">Happy</p>{" "}
              <p className="text-happy-color-text">pet</p>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutAuth;
