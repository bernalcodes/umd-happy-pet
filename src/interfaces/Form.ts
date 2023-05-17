export default interface Form {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  confirmPassword?: string;
  role: string;
  address?: string;
  cardNumber?: string;
}
