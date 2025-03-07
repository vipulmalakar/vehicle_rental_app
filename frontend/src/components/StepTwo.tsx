import { Formik, Form, ErrorMessage } from "formik";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import * as Yup from "yup";
import { useBookingForm } from "../context/BookingFormContext";

const StepTwoSchema = Yup.object().shape({
  wheels: Yup.number().required("Please select number of wheels"),
});

const StepTwo = ({ onSubmit, onBack }: { onSubmit: (values: any) => void, onBack: () => void }) => {
  const { formData, resetDependentFields } = useBookingForm();

  return (
    <Formik
      initialValues={formData}
      validationSchema={StepTwoSchema}
      onSubmit={(values, { validateForm }) => {
        validateForm().then((errors) => {
          if (Object.keys(errors).length === 0) {
            onSubmit(values);
          }
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
            <RadioGroup
              row
              value={values.wheels}
              onChange={(e) => {
                setFieldValue("wheels", Number(e.target.value));
                resetDependentFields("wheels");
              }}
              sx={{ justifyContent: 'center', gap: 5 }}
            >
              <FormControlLabel value={2} control={<Radio />} label="2-Wheeler" />
              <FormControlLabel value={4} control={<Radio />} label="4-Wheeler" />
            </RadioGroup>
          </FormControl>
          <ErrorMessage name="wheels" component="div" className="text-red-500" />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StepTwo;