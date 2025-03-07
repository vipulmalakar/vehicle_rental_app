export interface BookingFormValues {
  firstName: string;
  lastName: string;
  wheels: number | undefined;
  typeId: number | undefined;
  vehicleId: number | undefined;
  startDate: Date | null;
  endDate: Date | null;
}

export interface FinalBookingValues {
  firstName: string;
  lastName: string;
  vehicleId: number;
  startDate: Date;
  endDate: Date;
}

export interface StepProps {
  initialValues: BookingFormValues;
  onSubmit: (values: BookingFormValues) => void;
  onBack?: () => void;
}
