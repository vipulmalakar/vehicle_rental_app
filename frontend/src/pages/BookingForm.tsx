import { useState } from "react";
import { submitBooking } from "../services/api";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";
import { Stepper, Step, StepLabel, Container, Paper, Box, Typography } from "@mui/material";
import { BookingFormValues, FinalBookingValues } from "../interfaces/BookingFormInterfaces";
import { BookingFormProvider, useBookingForm } from "../context/BookingFormContext";

const steps = [
  "What is your name",
  "Number of wheels",
  "Type of vehicle",
  "Specific Model",
  "Date range picker"
];

const BookingFormContent = () => {
  const [step, setStep] = useState(0);
  const { formData, setFormData } = useBookingForm();

  const handleNext = (values: BookingFormValues) => {
    setFormData({ ...formData, ...values });
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: BookingFormValues) => {
    const finalValues: FinalBookingValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      vehicleId: values.vehicleId!,
      startDate: values.startDate!,
      endDate: values.endDate!,
    };

    try {
      await submitBooking(finalValues);
      return Promise.resolve();
    } catch (error) {
      console.error("Booking failed", error);
      return Promise.reject(error);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      wheels: undefined,
      typeId: undefined,
      vehicleId: undefined,
      startDate: null,
      endDate: null,
    });
    setStep(0);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3, md: 4 }, marginTop: { xs: 2, sm: 3, md: 4 } }}>
        <Typography component="h1" variant="h4" align="center">
          Vehicle Booking
        </Typography>
        <Stepper activeStep={step} alternativeLabel sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: { xs: 1, sm: 2 }, paddingX: { xs: 2, sm: 3, md: 5 } }}>
          {step === 0 && (
            <StepOne initialValues={formData} onSubmit={handleNext} />
          )}
          {step === 1 && (
            <StepTwo initialValues={formData} onSubmit={handleNext} onBack={handleBack} />
          )}
          {step === 2 && (
            <StepThree initialValues={formData} onSubmit={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <StepFour initialValues={formData} onSubmit={handleNext} onBack={handleBack} />
          )}
          {step === 4 && (
            <StepFive initialValues={formData} onSubmit={handleSubmit} onBack={handleBack} onReset={handleReset} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

const BookingForm = () => (
  <BookingFormProvider>
    <BookingFormContent />
  </BookingFormProvider>
);

export default BookingForm;