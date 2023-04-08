export default interface Form {
	name: string;
	lastName: string;
	email: string;
	phoneNumber: number;
	typeUser: string;
	address?: string;
	cardNumber?: string;
}