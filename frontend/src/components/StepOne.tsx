import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField, Box } from "@mui/material";
import * as Yup from "yup";
import { useBookingForm } from "../context/BookingFormContext";
import { BookingFormValues } from "../interfaces/BookingFormInterfaces";

const StepOneSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const StepOne = ({ onSubmit }: { initialValues: BookingFormValues; onSubmit: (values: BookingFormValues) => void; }) => {
  const { formData } = useBookingForm();

  return (
    <Formik
      initialValues={formData}
      validationSchema={StepOneSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <Box sx={{ marginBottom: 2 }}>
            <Field as={TextField} name="firstName" label="First Name" fullWidth />
            <ErrorMessage name="firstName" component="div" className="text-red-500" />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Field as={TextField} name="lastName" label="Last Name" fullWidth />
            <ErrorMessage name="lastName" component="div" className="text-red-500" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;