import { RaceBy } from "@uiball/loaders";
import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 font-bold">
      <h3 className="font-bold">Loading...</h3>
      <RaceBy size={80} lineWeight={5} speed={1.4} color="#A072FF" />
    </div>
  );
};

export default Loader;
