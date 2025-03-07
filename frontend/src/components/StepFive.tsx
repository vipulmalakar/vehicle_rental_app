import { Formik, Form, ErrorMessage } from "formik";
import { Button, Box } from "@mui/material";
import * as Yup from "yup";
import { useBookingForm } from "../context/BookingFormContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import BookingSuccess from "./BookingSuccess";
import axios from "axios";
import { BookingFormValues } from "../interfaces/BookingFormInterfaces";

const StepFiveSchema = Yup.object().shape({
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref('startDate'), "End date cannot be before start date"),
});

const StepFive = ({ onSubmit, onBack, onReset }: { initialValues: BookingFormValues; onSubmit: (values: BookingFormValues) => void; onBack: () => void; onReset: () => void; }) => {
  const { formData } = useBookingForm();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  const handleSubmit = async (values: BookingFormValues) => {
    try {
      await onSubmit(values);
      setIsBookingSuccessful(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Booking failed. Please try again.");
      }
      setSuccessMessage(null);
    }
  };

  const handleReset = () => {
    setIsBookingSuccessful(false);
    setSuccessMessage(null);
    setErrorMessage(null);
    onReset();
  };

  if (isBookingSuccessful) {
    return <BookingSuccess onReset={handleReset} />;
  }

  return (
    <Formik
      initialValues={{
        ...formData,
        startDate: formData.startDate || new Date(),
        endDate: formData.endDate || new Date(),
      }}
      validationSchema={StepFiveSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <Box sx={{ flex: 1 }}>
                <DatePicker
                  label="Start Date"
                  value={values.startDate ? dayjs(values.startDate) : null}
                  onChange={(date: Dayjs | null) => setFieldValue("startDate", date ? date.toDate() : null)}

                />
                <ErrorMessage name="startDate" component="div" className="text-red-500" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                <DatePicker
                  label="End Date"
                  value={values.endDate ? dayjs(values.endDate) : null}
                  onChange={(date: Dayjs | null) => setFieldValue("endDate", date ? date.toDate() : null)}
                />
                <ErrorMessage name="endDate" component="div" className="text-red-500" />
              </Box>
            </Box>
          </LocalizationProvider>
          {successMessage && <div className="text-green-500">{successMessage}</div>}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Confirm & Book
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StepFive;