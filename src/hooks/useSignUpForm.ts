import Form from "@/interfaces/Form";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { type } from "os";

export const useSignUpForm = () => {
	const typeUsers: string[] = ["I'm Customer", "I'm a Veterinarian"];

	const [typeUserSelected, setTypeUserSelected] = useState(typeUsers[0]);
	const [additionalField, setAdditionalField] = useState<string>("");
	const [step, setStep] = useState<number>(0);

	const [form, setForm] = useState<Form>({
		name: "",
		lastName: "",
		email: "",
		phoneNumber: 0,
		typeUser: "",
		password: "",
	});

	const useFormdata = useForm<Form>();
	const { register, handleSubmit, formState: { errors }, reset, setError } = useFormdata;

	const prevStep = (): void => {
		setStep((prevStep) => prevStep - 1)
	};

	const nextStep = (): void => {
		setError("name", { types: { required: "Name is required" } });

		if(errors) console.log(errors);
		//setStep((prevStep) => prevStep + 1)
	};

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
			step,
        },
        methods: {
            handleInputChange,
            selectTypeUser,
			nextStep,
			prevStep
        },
        hookForm: {
            handleSubmit,
            onSubmit,
            register,
            errors
        }
	};
};
