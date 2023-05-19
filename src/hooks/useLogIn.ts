import Form from "@/interfaces/Form";
import LoginInterface from "@/interfaces/LoginInterface";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useCustomer } from "@/context/UserContext";

export const useLogIn = () => {
  const [form, setForm] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const { login } = useFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInterface>();

  const router = useRouter();
  const { setUser } = useCustomer();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<LoginInterface> = async (
    data: LoginInterface
  ) => {
    console.log(data);
    try {
      const loggedUser = await login(data);
      if (loggedUser?.success) {
        console.log(loggedUser?.data);
        localStorage.setItem(`auth-token`, JSON.stringify(loggedUser?.data));
        router.push("vet/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    state: {
      form,
    },
    methods: {
      handleInputChange,
    },
    hookForm: {
      handleSubmit,
      onSubmit,
      register,
      errors,
    },
  };
};
