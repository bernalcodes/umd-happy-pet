import Form from "@/interfaces/Form";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useSignUpForm = () => {
	const typeUsers: string[] = ["I'm Customer", "I'm a Veterinarian"];

	const [typeUserSelected, setTypeUserSelected] = useState(typeUsers[0]);
	const [additionalField, setAdditionalField] = useState<string>("");

	const [form, setForm] = useState<Form>({
		name: "",
		lastName: "",
		email: "",
		phoneNumber: 0,
		typeUser: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Form>();

	const selectTypeUser = (event: React.MouseEvent<HTMLLIElement>) => {
		const index = typeUsers.findIndex(
			(type) => type === event.currentTarget.textContent
		);
		setTypeUserSelected(typeUsers[index]);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prevState) => ({
			...prevState,
			[name]: value,
			[additionalField]: name === "typeUser" ? "" : value,
		}));
	};

	const onSubmit: SubmitHandler<Form> = (data: Form) => {
		if (typeUserSelected === typeUsers[0]) {
			delete data.cardNumber;
		} else {
			delete data.address;
		}
		console.log(data);
	};

	useEffect(() => {
		setForm((prevState) => ({
			...prevState,
			typeUser: typeUserSelected,
		}));
		if (typeUserSelected === "I'm Customer") {
			setAdditionalField("address");
		} else {
			setAdditionalField("cardNumber");
		}
	}, [typeUserSelected]);

	return {
        state: {
            typeUserSelected,
            typeUsers,
            form,
        },
        methods: {
            handleInputChange,
            selectTypeUser,
        },
        hookForm: {
            handleSubmit,
            onSubmit,
            register,
            errors
        }
	};
};
