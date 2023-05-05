interface Customer {
  name: string;
  last_name: string;
  address: string;
  phone_number?: string;
  email?: string;
  pet_list: Pet[];
}
