import { useState } from "react";

export const useModal = (
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [open, isOpen] = useState<boolean>(initialValue);

  const openModal = () => isOpen(true);
  const closeModal = () => isOpen(false);

  return [open, openModal, closeModal];
};
