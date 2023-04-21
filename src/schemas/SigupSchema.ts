const step1Schema = {
	name: {
		required: "Name is required",
		minLength: {
			value: 2,
			message: "First name must be at least 2 characters long",
		},
	},
	lastName: {
		required: "Last name is required",
		minLength: {
			value: 2,
			message: "Last name must be at least 2 characters long",
		},
	},
	email: {
		required: "Email is required",
		pattern: {
			value: /\S+@\S+\.\S+/,
			message: "Invalid email address",
		},
	},
	phoneNumber: {
		required: "Phone is required",
		pattern: {
			value: /^[0-9]+$/,
			message: "Invalid phone number",
		},
	},
};

const step2Schema = {
	password: {
		required: "Password is required",
		pattern: {
			value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/,
			message: "Invalid password",
		},
	},
};
