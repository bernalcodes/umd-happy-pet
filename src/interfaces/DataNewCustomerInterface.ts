import { Dispatch, SetStateAction } from "react";
import {
  ChangeHandler,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

export interface DataNewCustomer {
  state: {
    openAccordion: number;
    setOpenAccordion: Dispatch<SetStateAction<number>>;
    newCustomer: Customer;
    setNewCustomer: Dispatch<SetStateAction<Customer>>;
  };
  handlers: {
    handleDeletePet: (
      event: React.MouseEvent<HTMLButtonElement>,
      idPet: string
    ) => void;
    handleAddPet: (newPet: Pet, idPet: string) => void;
    handleOpen: (value: number) => void;
    handleChangeCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  reactHookForm: {
    handleSubmit: (
      onValid: SubmitHandler<Customer>,
      onInvalid?: SubmitErrorHandler<Customer>
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: (
      name: string,
      RegisterOptions?: any
    ) => {
      onChange: ChangeHandler;
      onBlur: ChangeHandler;
      name: string;
      ref: React.Ref<any>;
    };
    errors: FieldErrors<Customer>;
  };
  methods: {
    onSubmit: SubmitHandler<Customer>;
  };
}
