import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import * as Yup from "yup";
import { fetchVehicleTypes } from "../services/api";
import { useBookingForm } from "../context/BookingFormContext";

interface VehicleType {
  id: number;
  name: string;
}

const StepThreeSchema = Yup.object().shape({
  typeId: Yup.number().required("Please select vehicle type"),
});

const StepThree = ({ onSubmit, onBack }: { onSubmit: (values: any) => void, onBack: () => void }) => {
  const { formData, resetDependentFields } = useBookingForm();
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  useEffect(() => {
    fetchVehicleTypes(formData.wheels)
      .then((res) => setVehicleTypes(res.data.data))
      .catch((err) => console.error("Error fetching vehicle types", err));
  }, [formData.wheels]);

  return (
    <Formik
      initialValues={formData}
      validationSchema={StepThreeSchema}
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
              value={values.typeId}
              onChange={(e) => {
                setFieldValue("typeId", Number(e.target.value));
                resetDependentFields("typeId");
              }}
              sx={{ justifyContent: 'center', gap: 5 }}
            >
              {vehicleTypes.map((type: VehicleType) => (
                <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
              ))}
            </RadioGroup>
          </FormControl>
          <ErrorMessage name="typeId" component="div" className="text-red-500" />
          
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

export default StepThree;