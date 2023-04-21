import Form from "@/interfaces/Form";
import LoginInterface from "@/interfaces/LoginInterface";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useLogIn = () => {
	
    

	const [form, setForm] = useState<LoginInterface>({
		email: "",
        password: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginInterface>();

	

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const onSubmit: SubmitHandler<LoginInterface> = (data: LoginInterface) => {
		console.log(data);
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
            errors
        }
	};
};
