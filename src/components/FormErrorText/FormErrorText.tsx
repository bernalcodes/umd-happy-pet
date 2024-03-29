import React from "react";
import { motion } from "framer-motion";

const FormErrorText = ({ message }: { message: string | undefined }) => {
  return (
    <motion.p
      initial={{ opacity: 0, top: 20 }}
      animate={{ opacity: 1, top: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg text-xs font-light text-[#ff9494] lg:text-sm"
    >
      {message}
    </motion.p>
  );
};

export default FormErrorText;
