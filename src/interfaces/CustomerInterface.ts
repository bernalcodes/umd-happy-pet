interface Customer {
  id: string;
  name: string;
  age: number;
  img: string;
  address: string;
  phone?: string;
  email?: string;
  pets: Pet[];
}
