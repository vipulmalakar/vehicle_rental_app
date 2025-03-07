import React, { createContext, useContext, useState } from "react";
import { BookingFormValues } from "../interfaces/BookingFormInterfaces";

interface BookingFormContextProps {
  formData: BookingFormValues;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormValues>>;
  resetDependentFields: (field: keyof BookingFormValues) => void;
}

const BookingFormContext = createContext<BookingFormContextProps | undefined>(undefined);

export const BookingFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<BookingFormValues>({
    firstName: "",
    lastName: "",
    wheels: undefined,
    typeId: undefined,
    vehicleId: undefined,
    startDate: null,
    endDate: null,
  });

  const resetDependentFields = (field: keyof BookingFormValues) => {
    if (field === "wheels") {
      setFormData((prevData) => ({
        ...prevData,
        typeId: undefined,
        vehicleId: undefined,
      }));
    } else if (field === "typeId") {
      setFormData((prevData) => ({
        ...prevData,
        vehicleId: undefined,
      }));
    }
  };

  return (
    <BookingFormContext.Provider value={{ formData, setFormData, resetDependentFields }}>
      {children}
    </BookingFormContext.Provider>
  );
};

export const useBookingForm = () => {
  const context = useContext(BookingFormContext);
  if (!context) {
    throw new Error("useBookingForm must be used within a BookingFormProvider");
  }
  return context;
};
